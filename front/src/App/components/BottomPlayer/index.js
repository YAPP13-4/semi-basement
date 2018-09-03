import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import classnames from 'classnames/bind'
import css from './index.scss'
import first from './Billy.mp3'

const cx = classnames.bind(css)
const moduleName = 'BottomPlayer'

// const cx = classnames.bind(css)

class BottomPlayer extends Component {
    render() {
        return (
          <div className={cx(`${moduleName}`)}>
            
            <ReactPlayer className={cx(`${moduleName}-player`) } url={first} controls={true}/>
          </div>
        )
      }
}
    
export default BottomPlayer