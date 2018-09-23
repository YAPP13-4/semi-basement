import React, { Component } from 'react'
import './HistoryTab.css'
import { SONG_URL } from '../../constants/ApiConstants'
import axios from 'axios'
import HistoryComponent from './HistoryComponent'
import { connect } from 'react-redux'
class HistoryTab extends Component {
    state = {
        tmpData : []
    }
    static getDerivedStateFromProps(nextProps , prevState) {
        if(nextProps.historySong.length !== prevState.tmpData.length) {
            return { tmpData : nextProps.historySong }
        }
    }
    /*
    componentDidMount() {
        this._getHistorySong();
    }*/
    _getHistorySong = () => {
        const historySongArray = JSON.parse(localStorage.historyData)
        console.log('history song',this.state.historySong)
        /*
        this.setState({
            tmpData: historySongArray
        })*/
        this._renderHistory();
    }
    _renderHistory = () => {
        this.state.tmpData.map((song, index)=> {
            return axios.get( SONG_URL.replace(':id', song))
            .then(response=>{
                console.log('history tab', response.data)
               this.setState({
                tmpData : this.state.tmpData.concat(response.data)
               })
            })
            .catch(err => {
                console.log(err)
            })
        })
    }
    render() {
        return(
            <div>
                 <h2 style={{color:'#ffffff'}}>its history tab </h2>
                 <button style={{color:'#ffffff'}} onClick={this._renderHistory} > button </button>
                 
            </div>
        )
    }
}
function mapStateToProps(state) {
    localStorage.historyData = JSON.stringify(state.music.historySong)

    const historyData = localStorage.historyData

    console.log('local Storage ', JSON.parse(historyData))
    
    return { 
        historySong : state.music.historySong
    }
} 

export default connect(mapStateToProps)(HistoryTab)
//export default MyPlayer