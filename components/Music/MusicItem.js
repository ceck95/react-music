import React,{Component} from 'react'
import {ListGroupItem} from 'react-bootstrap'
class MusicItem extends Component{
  constructor(props,context){
    super(props,context)
  }
  handelClick(){
    this.props.getOneMusic(this.props.music)
  }
  render(){
    return(
      <ListGroupItem onClick={this.handelClick.bind(this)} >
        {this.props.music.TenSong} - {this.props.music.CaSi}
      </ListGroupItem>
    )
  }
}
export default MusicItem
