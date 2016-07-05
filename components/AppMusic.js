import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from '../actions/actions'
import MusicDisplay from './Music/MusicDisplay'
class AppMusic extends Component {
  render() {
    return (
        <MusicDisplay actionsMusic={this.props.actions} listmusic={this.props.listmusic} onemusic={this.props.onemusic}/>
    )
  }

}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch){
  return {
    actions:bindActionCreators(actions,dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AppMusic)
