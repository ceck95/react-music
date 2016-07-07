import React,{Component} from 'react'
import {Grid , Row , Col,Panel,Navbar,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap'
import Form from './Form'
import { Link } from 'react-router'
import MusicList from './MusicList'
import AudioPlayer from 'react-responsive-audio-player'
import CSSModules from 'react-css-modules';
import styles from '../../public/stylesheets/MusicStyle.css'
import 'react-responsive-audio-player/dist/audioplayer.css'
import FontAwesome from 'react-fontawesome'
class MusicDisplay extends Component{
  constructor(props,context){
    super(props,context)
    this.state = {
      music_one:[]
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.onemusic){
      this.setState({
        music_one:nextProps.onemusic
      })
    }
  }
  handelClick(){
    this.props.actionsMusic.resetPlayList(this.props.listmusic)
  }
  render(){
    return(
      <div>
        <Navbar  styleName='custom-container' inverse>
          <Navbar.Header>
            <Navbar.Brand>
                <Link to="/" onClick={this.handelClick.bind(this)}><FontAwesome name='arrow-left' /></Link>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid fluid>
          <Row className="show-grid">
            <Col xs={12} md={6} mdOffset={3}>
              <Form childrenActionMusic={this.props.actionsMusic.musicSearchApi}/>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={6} mdOffset={3}>
              <Panel styleName='panel-body'>
                <MusicList listmusic={this.props.listmusic} getoneAcionsMusic={this.props.actionsMusic.getOneMusic} onemusic={this.props.onemusic}/>
              </Panel>
            </Col>
          </Row>
        </Grid>
        <AudioPlayer playlist={ this.state.music_one } autoplay={ true }/>
      </div>
    )
  }
}
export default CSSModules(MusicDisplay, styles);
