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

    componentDidMount() {
        //cart state가 local storage에 있으면 불러오기
        let localHistory = localStorage.historySong;
        console.log('local history' , localHistory)
        if(localHistory) {
            this.setState({
                songId: JSON.parse(localHistory)
            })
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if(prevState.songId !== this.state.songId) {
            console.log('prevState.songId',prevState.songId)
            console.log('this.state.songId',this.state.songId)
            localStorage.historySong = JSON.stringify(this.state.songId);
        }
    }

    static getDerivedStateFromProps(nextProps , prevState) {
        //songId 에 새로 추가한 곡이 없으면
        let prevSongId = prevState.songId;
        const is = prevSongId.some(item => {
            return item === nextProps.historySong;
        });

        if(!is) {
            return {
                songId : prevState.songId.concat(nextProps.historySong)
            }
        }else {
            return null;
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
                                        duration = {song.duration}
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
    return { 
        historySong : state.music.historySong
    }
} 

export default connect(mapStateToProps)(HistoryTab)