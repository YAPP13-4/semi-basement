import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectSong } from '../../../../redux/music/actions'
import axios from 'axios';
import { resolveUrl } from '../../../constants/ApiConstants'
import classnames from 'classnames/bind'
import SongChartList from './constants/test/SongChartList' 
import Navigation from '../components/Navigation/index'
import css from './ChartTab.scss'
import ChartTabItem from './containers/ChartTabContainer'

import HistoryTab from '../../../components/HistoryTab/HistoryTab'

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
            //console.log('data',songInfo)
            return <ChartTabItem 
                        key      = {index}
                        ind      = {index}
                        singer   = {songInfo.user.permalink}
                        title    = {songInfo.title}
                        artwork  = {songInfo.artwork_url}
                        duration = {songInfo.duration}
                        favoriteCount = {songInfo.favoritings_count}
                        playCount = {songInfo.playback_count}
                        songId = {songInfo.id}
                        selected = {()=>{this._fetchSong(songInfo)}}
                    />
        })
        return songs;
    }
    //나중에 서버에서 song을 받아오면... .. state 수정해서 넣어야지 ..
    render() {
        return(
            <div className = {cx(`${moduleName}`)}>
                <Navigation />
                <div className={cx(`${moduleName}-selectTab`)}>
                    <div></div>
                    <div>
                        <select>
                            <option value="Top50">Top 50</option>
                        </select>
                    </div>
                </div>
                <div className={cx(`${moduleName}-chart`)}>
                    <table>
                        <tbody>
                            {this.state.songInfos ? this._renderChart() : 'Loading'}  
                        </tbody>
                    </table>
                    
                </div>
                <HistoryTab />
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectSong} , dispatch)
}
export default connect(null,mapDispatchToProps)(ChartTab);