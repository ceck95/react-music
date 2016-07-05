import React,{Component} from 'react'
import MusicItem from './MusicItem'
import {ListGroup,ListGroupItem} from 'react-bootstrap'
class MusicList extends Component{
  componentDidMount(){

  }
  render(){
    return (
      <ListGroup componentClass="ul">
      {
        this.props.listmusic.map((music,key)=>{
          return <MusicItem music={music} key={key} getOneMusic={this.props.getoneAcionsMusic}/>
        })
      }
      </ListGroup>
    )
  }
}
export default MusicList
