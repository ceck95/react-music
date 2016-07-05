#react-responsive-audio-player

A simple, clean, and responsive visual wrapper for the HTML audio tag, built with React. Give it a playlist and go.

See it live at http://benwiley4000.github.io/react-responsive-audio-player/.

**If you're not using npm and you need production-ready scripts to include in your project, check out [the releases](https://github.com/benwiley4000/react-responsive-audio-player/releases).**

##Usage
HTML:
```
<!DOCTYPE html>
<html>
  <head><link rel="stylesheet" href="audioplayer.css"></head>
  <body>
    <div id="audio_player_container"></div>
    <script src="dist/main.js"></script>
  </body>
</html>
```
JavaScript (with JSX):
```
// dist/main.js
var React = require('react');
var ReactDOM = require('react-dom');
var AudioPlayer = require('react-responsive-audio-player');

var playlist =
  [{ url: 'audio/track1.mp3',
     displayText: 'Track 1 by Some Artist' },
   { url: 'audio/track2.mp3',
     displayText: 'Some Other Artist - Track 2' }];
ReactDOM.render(
  <AudioPlayer playlist={ playlist } hideBackSkip={ true } />,
  document.getElementById('audio_player_container')
);
```
JavaScript (without JSX):
```
// dist/main.js
...
ReactDOM.render(
  React.createElement(AudioPlayer, {
    playlist: playlist,
    hideBackSkip: true
  }),
  document.getElementById('audio_player_container')
);
```

##Getting started
###Quick start
The fastest way to get off the ground with this module is to paste the following code into an HTML file and open it in a web browser:
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>React Responsive Audio Player</title>
    <style> html, body { margin: 0; background: lightseagreen; } </style>
    <!-- audioplayer.css v0.3.0 -->
    <link rel="stylesheet" href="https://cdn.rawgit.com/benwiley4000/react-responsive-audio-player/66e872d54df1f97a91611e115127bb6a1d3a173a/audioplayer.css">
  </head>
  <body>
    <div id="audio_player_container"></div>

    <!-- react/react-dom served over CDN -->
    <script src="https://fb.me/react-0.14.7.js"></script>
    <script src="https://fb.me/react-dom-0.14.7.js"></script>
    <!-- classnames v2.2.3 -->
    <script src="https://cdn.rawgit.com/JedWatson/classnames/a6934cd623c1ea2a895575af9c83b08c8bdd3b05/index.js"></script>
    <!-- audioplayer.js v0.3.0 -->
    <script src="https://cdn.rawgit.com/benwiley4000/react-responsive-audio-player/66e872d54df1f97a91611e115127bb6a1d3a173a/audioplayer.js"></script>
    <script>
      var playlist =
        [{ url: 'song1.mp3', displayText: 'Track 1 - a track to remember' },
         { url: 'song2.ogg', displayText: 'Oggs Oggs Oggs' }];
      ReactDOM.render(
        React.createElement(AudioPlayer, { playlist: playlist, autoplay: true, autoplayDelayInSeconds: 2.1 }),
        document.getElementById('audio_player_container')
      );
    </script>
  </body>
</html>
```
Of course you'll need to include paths to actual audio files, or the player will display and not work.

###Package installation
If you use [npm](https://www.npmjs.com/) and a front-end package bundling system like [Browserify](http://browserify.org/) or [webpack](https://webpack.github.io/), it's recommended that you install the package and its dependencies in your project:
```
npm install --save react-responsive-audio-player classnames react react-dom
```
While `react-dom` isn't technically a peer dependency, you'll need it if you plan to place the audio player in the DOM, which you probably will.

When you first include the component in your project it might not look how you're expecting. Be sure to check the **Styling** section below.

###Pre-built releases
If you prefer not to use a package bundler, you can find built releases to download [here](https://github.com/benwiley4000/react-responsive-audio-player/releases).

##Options
Options can be passed to the AudioPlayer element as props. Currently supported props are:
* `playlist`: an array containing urls and display text for each of the tracks you wish to play (see above example for format). **undefined** by default.

* `autoplay`: a boolean value (`true`/`false`) that if true will cause the player to begin automatically once mounted. **false** by default.

* `autoplayDelayInSeconds`: a number value that represents the number of seconds to wait until beginning autoplay. Will be ignored if `autoplay` is false. **0** by default. *NOTE:* Delay is managed by `setTimeout` and is therefore inexact. If you need to time an autoplay exactly, find a different module that uses the [WebAudio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) for playback (or fork this one!).

* `gapLengthInSeconds`: a number value that represents the number of seconds to wait at the end of a track before beginning the next one in the playlist. Not applicable for manually-initiated skip. **0** by default. *NOTE:* Like `autoplayDelayInSeconds`, this delay is inexact.

* `hideBackSkip`: a boolean value that if true disables the back skip button by hiding it from view. **false** by default.

* `stayOnBackSkipThreshold`: a number value that represents the number of seconds of progress after which pressing the back button will simply restart the current track. **5** by default.

* `placeAtTop`: a boolean value that if true places the player at the top of the page rather than at the bottom. **false** be default.

None of these options is required, though the player will be functionally disabled if no `playlist` prop is provided.

##Styling
**IMPORTANT NOTES**
* In order to use the default stylings you'll need to grab the compiled `audioplayer.css` sheet from the module's `dist/` directory. Again, if you're not using npm, you can get the sheet [here](https://github.com/benwiley4000/react-responsive-audio-player/releases).
* Include the following code in your own CSS to ensure the audio player takes up the full screen width:
```
html,
body {
  margin: 0;
}
```

*The default look:*

![Audio Player Screenshot](audio_player_example_01.png)

The default stylings for the audio player can be found [here](https://github.com/benwiley4000/react-responsive-audio-player/blob/master/src/index.scss). It's easy to override them with CSS.

To change the `font-family` for the whole component, use:
```
.audio_player {
  font-family: Helvetica,sans-serif;
}
```
To make the audio player's background color `firebrick`, use:
```
.audio_player {
  background-color: #b22222;
}
.audio_player .play_pause_button .triangle_1,
.audio_player .play_pause_button .tirangle_2 {
  border-right-color: #b22222;
}
```
##Contribute
Contributions are welcome. If you'd like to implement a new feature, please open an issue first.

###Build
To install build dependencies, run `npm install`.

Run webpack with `npm run build`. Built files can be found in the `dist/` directory. You can also use `npm run dev`; it's configured to do exactly the same thing, except it will continue watching for any changes you make, and recompile.

If you plan to submit a pull request, please test your changes. You can create a symbolic link from the module to your project to make those tests easier.

```
# inside of project/node_modules/ directory (module doesn't exist here yet)
ln -s ../../path/to/module/repository/ react-responsive-audio-player
```
And you can delete that symbolic link (without deleting the linked directory) with `rm react-responsive-audio-player` (no slash).

You can also try doing this with [npm link](https://docs.npmjs.com/cli/link). However, it's been known to cause issues occasionally with duplicate peer dependencies, so be warned.
