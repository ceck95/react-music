import React,{Component} from 'react'
import {ListGroupItem} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import styles from '../../public/stylesheets/MusicStyle.css'
import CSSModules from 'react-css-modules';
class MusicItem extends Component{
  constructor(props,context){
    super(props,context)
  }
  handelClick(){
    this.props.getOneMusic(this.props.music,this.props.listmusic);
  }
  render(){
    var play
    if(this.props.music.play == true){
      play = <FontAwesome name='music' className='pull-right'/>
    }else{
      play = ''
    }
    return(
        <ListGroupItem styleName='custom-hover-item-listgroup'>
          <div onClick={this.handelClick.bind(this)}>
            {this.props.music.TenSong} - {this.props.music.CaSi} {play}
          </div>
        </ListGroupItem>
    )
  }
}
export default CSSModules(MusicItem,styles)
