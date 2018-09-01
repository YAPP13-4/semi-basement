import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import classnames from 'classnames/bind'
import css from './index.scss'
import first from './Billy.mp3'








// const cx = classnames.bind(css)

class BottomPlayer extends Component {
    render() {
        return (
          <ReactPlayer url={first} controls={true}/>
        )
      }
}
    
export default BottomPlayer