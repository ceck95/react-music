const React = require('react');
const classNames = require('classnames');

const log = console.log.bind(console);
const logError = console.error ? console.error.bind(console) : log;
const logWarning = console.warn ? console.warn.bind(console) : log;

/* converts given number of seconds to standard time display format
 * http://goo.gl/kEvnKn
 */
function convertToTime (number) {
  const mins = Math.floor(number / 60);
  const secs = (number % 60).toFixed();
  return `${ mins < 10 ? '0' : '' }${ mins }:${ secs < 10 ? '0' : '' }${ secs }`;
}

/*
 * AudioPlayer
 *
 * Accepts 'playlist' prop of the form:
 *
 * [{ "url": "./path/to/file.mp3",
 *    "displayText": "ArtistA - Track 1" },
 *  { "url": "https://domain.com/track2.ogg",
 *    "displayText": "ArtistB - Track 2" }]
 *
 * Accepts 'autoplay' prop (true/[false]).
 *
 * Accepts 'autoplayDelayInSeconds' prop (default 0).
 *
 * Accepts 'gapLengthInSeconds' prop (default 0).
 * Specifies gap at end of one track before next
 * track begins (ignored for manual skip).
 *
 * Accepts 'hideBackSkip' prop (default false,
 * hides back skip button if true).
 *
 * Accepts 'stayOnBackSkipThreshold' prop, default 5,
 * is number of seconds to progress until pressing back skip
 * restarts the current track.
 *
 * Accepts 'placeAtTop' prop, default false, if true,
 * player is placed at top of screen instead of bottom.
 *
 */
class AudioPlayer extends React.Component {

  constructor (props) {
    super(props);

    this.playlist = props.playlist;

    /* true if the user is currently dragging the mouse
     * to seek a new track position
     */
    this.seekInProgress = false;
    // index matching requested track (whether track has loaded or not)
    this.currentTrackIndex = 0;

    this.state = {
      /* activeTrackIndex will change to match
       * this.currentTrackIndex once metadata has loaded
       */
      activeTrackIndex: -1,
      // indicates whether audio player should be paused
      paused: true,
      /* elapsed time for current track, in seconds -
       * DISPLAY ONLY! the actual elapsed time may
       * not match up if we're currently seeking, since
       * the new time is visually previewed before the
       * audio seeks.
       */
      displayedTime: 0 
    };

    // html audio element used for playback
    this.audio = null;
    this.audioProgressContainer = null;
    /* bounding rectangle used for calculating seek
     * position from mouse/touch coordinates
     */
    this.audioProgressBoundingRect = null;

    // EventListeners to create on mount and remove on unmount
    this.seekReleaseListener = null;
    this.resizeListener = null;
  }

  componentDidMount () {
    require('./index.scss');

    const seekReleaseListener = this.seekReleaseListener = this.seek.bind(this);
    window.addEventListener('mouseup', seekReleaseListener);
    document.addEventListener('touchend', seekReleaseListener);
    const resizeListener = this.resizeListener = this.fetchAudioProgressBoundingRect.bind(this);
    window.addEventListener('resize', resizeListener);
    resizeListener();

    const audio = this.audio = document.createElement('audio');
    audio.preload = 'metadata';
    audio.addEventListener('ended', () => {
      const gapLengthInSeconds = this.props.gapLengthInSeconds || 0;
      setTimeout(this.skipToNextTrack.bind(this), gapLengthInSeconds * 1000);
    });
    audio.addEventListener('timeupdate', this.handleTimeUpdate.bind(this));
    audio.addEventListener('loadedmetadata', () => {
      this.setState({
        activeTrackIndex: this.currentTrackIndex
      });
    });
    audio.addEventListener('play', () => {
      this.setState({
        paused: false
      });
    });
    audio.addEventListener('stalled', this.togglePause.bind(this, true));
    if (this.playlist && this.playlist.length) {
      this.updateSource();
      if (this.props.autoplay) {
        const delay = this.props.autoplayDelayInSeconds || 0;
        setTimeout(this.togglePause.bind(this, false), delay * 1000);
      }
    }
  }

  componentWillUnmount () {
    // remove event listeners bound outside the scope of our component
    window.removeEventListener('mouseup', this.seekReleaseListener);
    document.removeEventListener('touchend', this.seekReleaseListener);
    window.removeEventListener('resize', this.resizeListener);

    /* pause the audio element before dereferencing it
     * (we can't know when garbage collection will run)
     */
    this.audio.pause();
    this.audio = null;
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.playlist) {
      return;
    }
    this.playlist = nextProps.playlist;
    this.currentTrackIndex = -1;
    if (this.audio) {
      this.skipToNextTrack(false);
    }
  }

  togglePause (value) {
    if (!this.audio) {
      return;
    }
    const pause = typeof value === 'boolean' ? value : !this.state.paused;
    if (pause) {
      this.audio.pause();
      return this.setState({
        paused: true
      });
    }
    if (!this.playlist || !this.playlist.length) {
      return;
    }
    try {
      this.audio.play();
    } catch (error) {
      logError(error);
      const warningMessage =
        'Audio playback failed at ' +
        new Date().toLocaleTimeString() +
        '! (Perhaps autoplay is disabled in this browser.)';
      logWarning(warningMessage);
    }
  }

  skipToNextTrack (shouldPlay) {
    if (!this.audio) {
      return;
    }
    this.audio.pause();
    if (!this.playlist || !this.playlist.length) {
      return;
    }
    let i = this.currentTrackIndex + 1;
    if (i >= this.playlist.length) {
      i = 0;
    }
    this.currentTrackIndex = i;
    this.setState({
      activeTrackIndex: -1,
      displayedTime: 0
    }, () => {
      this.updateSource();
      const shouldPause = typeof shouldPlay === 'boolean' ? !shouldPlay : false;
      this.togglePause(shouldPause);
    });
  }

  backSkip () {
    if (!this.playlist || !this.playlist.length) {
      return;
    }
    const audio = this.audio;
    let stayOnBackSkipThreshold = this.props.stayOnBackSkipThreshold;
    if (isNaN(stayOnBackSkipThreshold)) {
      stayOnBackSkipThreshold = 5;
    }
    if (audio.currentTime >= stayOnBackSkipThreshold) {
      return audio.currentTime = 0;
    }
    let i = this.currentTrackIndex - 1;
    if (i < 0) {
      i = this.playlist.length - 1;
    }
    this.currentTrackIndex = i - 1;
    this.skipToNextTrack();
  }

  updateSource () {
    this.audio.src = this.playlist[this.currentTrackIndex].url;
  }

  fetchAudioProgressBoundingRect () {
    this.audioProgressBoundingRect = this.audioProgressContainer.getBoundingClientRect();
  }

  handleTimeUpdate () {
    if (!this.seekInProgress && this.audio) {
      this.setState({
        displayedTime: this.audio.currentTime
      });
    }
  }

  adjustDisplayedTime (event) {
    if (!this.playlist || !this.playlist.length) {
      return;
    }
    // make sure we don't select stuff in the background while seeking
    if (event.type === 'mousedown' || event.type === 'touchstart') {
      this.seekInProgress = true;
      document.body.classList.add('noselect');
    } else if (!this.seekInProgress) {
      return;
    }
    /* we don't want mouse handlers to receive the event
     * after touch handlers if we're seeking.
     */
    event.preventDefault();
    const boundingRect = this.audioProgressBoundingRect;
    const isTouch = event.type.slice(0, 5) === 'touch';
    const pageX = isTouch ? event.targetTouches.item(0).pageX : event.pageX;
    const position = pageX - boundingRect.left - document.body.scrollLeft;
    const containerWidth = boundingRect.width;
    const progressPercentage = position / containerWidth;
    this.setState({
      displayedTime: progressPercentage * this.audio.duration
    });
  }

  seek (event) {
    /* this function is activated when the user lets
     * go of the mouse, so if .noselect was applied
     * to the document body, get rid of it.
     */
    document.body.classList.remove('noselect');
    if (!this.seekInProgress) {
      return;
    }
    /* we don't want mouse handlers to receive the event
     * after touch handlers if we're seeking.
     */
    event.preventDefault();
    this.seekInProgress = false;
    const displayedTime = this.state.displayedTime;
    if (isNaN(displayedTime)) {
      return;
    }
    this.audio.currentTime = displayedTime;
  }

  render () {
    const activeIndex = this.state.activeTrackIndex;
    const displayText = activeIndex < 0 ? null : this.playlist[activeIndex].displayText;

    const displayedTime = this.state.displayedTime;
    const duration = this.audio && this.audio.duration || 0;

    const elapsedTime = convertToTime(displayedTime);
    const fullTime = convertToTime(duration);
    const timeRatio = `${ elapsedTime } / ${ fullTime }`;

    const progressBarWidth = `${ (displayedTime / duration) * 100 }%`;

    return (
      <div id="audio_player"
           className={ classNames('audio_player', { 'top': this.props.placeAtTop }) }
           title={ displayText }>

        <div className="audio_controls">
          <div id="skip_button"
               className={ classNames('skip_button', 'back', 'audio_button', {
                 'hidden': this.props.hideBackSkip
               }) }
               onClick={ this.backSkip.bind(this) }>
            <div className="skip_button_inner">
              <div className="right_facing_triangle"></div>
              <div className="right_facing_triangle"></div>
            </div>
          </div>
          <div id="play_pause_button"
               className={ classNames('play_pause_button', 'audio_button', {
                 'paused': this.state.paused
               }) }
               onClick={ this.togglePause.bind(this, null) }>
            <div className="play_pause_inner">
              <div className="left"></div>
              <div className="right"></div>
              <div className="triangle_1"></div>
              <div className="triangle_2"></div>
            </div>
          </div>
          <div id="skip_button"
               className="skip_button audio_button"
               onClick={ this.skipToNextTrack.bind(this, null) }>
            <div className="skip_button_inner">
              <div className="right_facing_triangle"></div>
              <div className="right_facing_triangle"></div>
            </div>
          </div>
        </div>

        <div id="audio_progress_container"
             className="audio_progress_container"
             ref={ (ref) => this.audioProgressContainer = ref }
             onMouseDown={ this.adjustDisplayedTime.bind(this) }
             onMouseMove={ this.adjustDisplayedTime.bind(this) }
             onTouchStart={ this.adjustDisplayedTime.bind(this) }
             onTouchMove={ this.adjustDisplayedTime.bind(this) }>
          <div id="audio_progress"
               className="audio_progress"
               style={ { width: progressBarWidth } }></div>
          <div id="audio_progress_overlay" className="audio_progress_overlay">
            <div className="audio_info_marquee">
              <div id="audio_info" className="audio_info noselect" draggable="false">
                { displayText }
              </div>
            </div>
            <div id="audio_time_progress"
                 className="audio_time_progress noselect"
                 draggable="false">
              { timeRatio }
            </div>
          </div>
        </div>

      </div>
    );
  }

}

AudioPlayer.propTypes = {
  playlist: React.PropTypes.array,
  autoplay: React.PropTypes.bool,
  autoplayDelayInSeconds: React.PropTypes.number,
  gapLengthInSeconds: React.PropTypes.number,
  hideBackSkip: React.PropTypes.bool,
  stayOnBackSkipThreshold: React.PropTypes.number,
  placeAtTop: React.PropTypes.bool
};

module.exports = AudioPlayer;
