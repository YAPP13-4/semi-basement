import React, { Component } from "react"
import css from "./HistoryTab.scss"
import classnames from "classnames/bind"
import { SONG_URL } from "../../constants/ApiConstants"
import axios from "axios"
import HistoryComponent from "./HistoryComponent"
import { connect } from "react-redux"
const cx = classnames.bind(css)
const moduleName = "HistoryTab"

class HistoryTab extends Component {
  //그려지고 난 다음에 localStorage 랑 동기화
  state = {
    historyId: [],
    historyData: []
  }
  /*
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("nexprops", nextProps.historySong)
    console.log("prvstate", prevState)
    if (nextProps.historySong !== prevState.historyId) {
      return {
        historyId: nextProps.historySong
      }
    }
    return null
  }
  componentDidMount() {
    console.log("component did mount ", this.props.historySong)
    this.props.historyId.map(song => {
      return axios
        .get(SONG_URL.replace(":id", song))
        .then(response => {
          this.setState(prevState => {
            return {
              historyData: [...prevState.historyData, response.data]
            }
          })
        })
        .catch(err => {
          console.log("history tab", err)
        })
    })
  }
*/
  //get Data From SoundColud
  getHistorySong = () => {
    /*
    this.state.songId.map(song => {
      return axios
        .get(SONG_URL.replace(":id", song))
        .then(response => {
          // console.log("history tab", response.data)
          this.setState(prevState => {
            return {
              songData: [...prevState.songData, response.data]
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    })*/
  }
  //Render HistoryComponent from songData
  renderHistory = () => {
    console.log("history", this.props.historySong)
    return this.props.historySong.map((song, index) => (
      <HistoryComponent
        key={`history-${index}`}
        songId={song.data.id}
        artwork={song.data.artwork_url}
        duration={song.data.duration}
        title={song.data.title}
        singer={song.data.user.username}
      />
    ))
  }
  render() {
    // ()
    console.log("songdata", this.state.songData)

    console.log("this.props.historySong", this.props.historySong)

    return (
      <div className={cx(`${moduleName}`)}>
        <div
          className={cx(`${moduleName}__Wrapper`)}
          style={{ color: "#ffffff" }}
        >
          {/*<button onClick={this._getHistorySong}>butn</button> */}
          {this.props.historySong ? this.renderHistory() : "Loading"}
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    historySong: state.music.historySong
  }
}

export default connect(mapStateToProps)(HistoryTab)
