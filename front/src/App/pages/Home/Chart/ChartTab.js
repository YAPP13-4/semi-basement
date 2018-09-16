import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectSong } from '../../../../actions/index'
import axios from 'axios';
import { resolveUrl } from '../../../constants/ApiConstants'
import classnames from 'classnames/bind'
import SongChartList from './constants/test/SongChartList' 

import css from './ChartTab.scss'
import ChartTabItem from './containers/ChartTabContainer'
const cx         = classnames.bind(css)
const moduleName = 'ChartTab'

class ChartTab extends Component {
    state = {
        songInfos: [],
      }
    componentDidMount() {
        this._requestId();
      }

    _requestId = () => {
        SongChartList.map( (url)=> {
        return axios.get(resolveUrl(url))
              .then(response => {
                this.setState({
                  songInfos: this.state.songInfos.concat(response.data)
                }) 
                //return response.data;
              })
      })
    }
    _fetchSong = (songInfo) => {
      console.log('click',songInfo);
      this.props.selectSong(songInfo.id) // 속성 뭔지 확인해서 고치기 
    }
    _renderChart = () => {
        const songs = this.state.songInfos.map( (songInfo,index)=> {
            return <ChartTabItem 
                        key      = {index}
                        singer   = {songInfo.user.permalink}
                        title    = {songInfo.title}
                        artwork  = {songInfo.artwork_url}
                        selected = {()=>{this._fetchSong(songInfo)}}
                    />
        })
        return songs;
    }
    //나중에 서버에서 song을 받아오면... .. state 수정해서 넣어야지 ..
    render() {
        return(
            <div className = {cx(`${moduleName}`)}>
                <div className={cx(`${moduleName}-selectTab`)}>
                    <button>  </button>
                    <select>
                        <option value="Top50">Top50</option>
                    </select>
                </div>
                <div className={cx(`${moduleName}-chart`)}>
                    {this.state.songInfos ? this._renderChart() : 'Loading'}  
                </div>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectSong} , dispatch)
}
export default connect(null,mapDispatchToProps)(ChartTab);