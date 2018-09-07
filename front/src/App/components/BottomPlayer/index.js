import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import classnames from 'classnames/bind'
import {connect} from 'react-redux' 
import css from './index.scss'

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
function mapStateToProps({song}) {
  return { song : song}
} 
export default connect(mapStateToProps)(BottomPlayer)