import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import classnames from 'classnames/bind'
import {connect} from 'react-redux' 
import css from './index.scss'
import { SONG_URL } from '../../constants/ApiConstants'
import { callApi } from '../../../utils/ApiUtils'

const cx = classnames.bind(css)
const moduleName = 'BottomPlayer'


class BottomPlayer extends Component {
    render() {
        return (
          <div className={cx(`${moduleName}`)}>
            {console.log('song :' +this.props.song)}
            <ReactPlayer className={cx(`${moduleName}-player`) } url={this.props.song} controls={true}/>
          </div>
        )
      }
}
function mapStateToProps({song}) {
  const songurl = (SONG_URL.replace(':id', song));
  return { song : songurl}
} 
export default connect(mapStateToProps)(BottomPlayer)