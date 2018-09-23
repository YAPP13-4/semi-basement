import React, { Component } from 'react'
import css from './HistoryTab.scss'
import classnames from 'classnames/bind'
import { SONG_URL } from '../../constants/ApiConstants'
import axios from 'axios'
import HistoryComponent from './HistoryComponent'
import { connect } from 'react-redux'
const cx         = classnames.bind(css)
const moduleName = 'HistoryTab'
class HistoryTab extends Component {
    state = {
        songId : [],
        songData : []
    }
    
    static getDerivedStateFromProps(nextProps , prevState) {
        if(nextProps.historySong.length !== prevState.songId.length) {
            return { songId : nextProps.historySong 
            }
        }
    }
    
    _getHistorySong = () => {
       console.log('history song', this.props.historySong)
        this.state.songId.map((song)=> {
            return axios.get( SONG_URL.replace(':id', song))
            .then(response=>{
                //console.log('history tab', response.data)
                this.setState({
                    songData : this.state.songData.concat(response.data)
                })
            })
            .catch(err => {
                console.log(err)
            })
        })
    }
    _renderHistory = () => {
        const historySongs = this.state.songData.map( (song, index) => {
            console.log('song data',song)
            return <HistoryComponent    key = {index}
                                        songId = {song.id}
                                        artwork = {song.artwork_url}
                                        title = {song.title}
                                        singer = {song.user.username}
                    />
        })
        return historySongs
    }
    render() {
       // ()
        return(
            <div className={cx(`${moduleName}`)}>
                 <div className={cx(`${moduleName}__Wrapper`)}>
                    <button onClick={this._getHistorySong} >butn</button>
                    {this.state.songData ? this._renderHistory() : 'Loading'}
                 </div>
                 
            </div>
        )
    }
}
function mapStateToProps(state) {
    const historyData = localStorage.historyData
    localStorage.historyData = JSON.stringify(state.music.historySong)
    console.log('local Storage ', JSON.parse(historyData))
    //console.log('state.music.historySong',state.music.historySong)
    return { 
        historySong : state.music.historySong
    }
} 

export default connect(mapStateToProps)(HistoryTab)
//export default MyPlayer