import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import classnames from 'classnames/bind'
import { connect } from 'react-redux' 
import { bindActionCreators } from 'redux'
import { toggleHistory } from '../../../redux/meta/actions'
import { SONG_URL } from '../../constants/ApiConstants'
import HistoryTab from '../HistoryTab/HistoryTab'
import css from './index.scss'
const cx = classnames.bind(css)
const moduleName = 'BottomPlayer'
  class BottomPlayer extends Component {
    
    render() {
        return (
          <div className={cx(`${moduleName}`)}>
            <ReactPlayer className={cx(`${moduleName}`+(this.props.toggleHistoryTab ? '-player' : '-hidden')  ) } url={this.props.song} controls={true}/>
            
            <button onClick={this.props.toggleHistory}> history  </button>
            <div className={cx(`${moduleName}-historyTab`)}><HistoryTab /></div>
          </div>
        )
      }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({toggleHistory} , dispatch)
}


function mapStateToProps(state) {
  const songurl = (SONG_URL.replace(':id', state.music.song));
  return { 
        song : songurl,
        toggleHistoryTab : state.meta.toggleHistory  
      }
}


export default connect(mapStateToProps,mapDispatchToProps)(BottomPlayer)
