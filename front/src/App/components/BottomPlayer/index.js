import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import classnames from 'classnames/bind'
import { heardSong } from '../../../actions/index'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux' 
import css from './index.scss'
import { SONG_URL } from '../../constants/ApiConstants'

const cx = classnames.bind(css)
const moduleName = 'BottomPlayer'


  class BottomPlayer extends Component {
    render() {
        return (
          <div className={cx(`${moduleName}`)}>
            {console.log('song :' +this.props.song)}
            <ReactPlayer className={cx(`${moduleName}-player`) } 
                        url={this.props.song} 
                        controls={true}
                        />
          </div>
        )
      }
}
//function mapDispatchToProps
function mapStateToProps({song}) {
  const songurl = (SONG_URL.replace(':id', song));
  return { song : songurl}
} 
function mapDispatchToProps(dispatch) {
  // selectBook 이 호출되면, 결과는 
  // 모든 reducers에게 전달. 
  return bindActionCreators({ heardSong : heardSong}, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(BottomPlayer)