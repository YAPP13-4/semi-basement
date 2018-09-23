import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import classnames from 'classnames/bind'
import {connect} from 'react-redux' 
import css from './index.scss'
import { SONG_URL } from '../../constants/ApiConstants'
const cx = classnames.bind(css)
const moduleName = 'BottomPlayer'


  class BottomPlayer extends Component {
    render() {
        return (
          <div className={cx(`${moduleName}`)}>

            <ReactPlayer className={cx(`${moduleName}-player`) } url={this.props.song} controls={true}/>
          </div>
        )
      }
}

function mapStateToProps(state) {
  const songurl = (SONG_URL.replace(':id', state.music.song));
  return { song : songurl}
} 

export default connect(mapStateToProps)(BottomPlayer)