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
  constructor(props) {
    super(props)
    console.log("constructor props ", props)
    this.state = {
      songId: [props.historySong],
      songData: []
    }
    console.log(this.state.songId)
  }
  //그려지고 난 다음에 localStorage 랑 동기화
  componentDidMount() {
    //cart state가 local storage에 있으면 불러오기
    let localHistory = localStorage.historySong
    console.log("local history", localHistory)
    if (localHistory) {
      this.setState({
        songId: JSON.parse(localHistory)
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.songId !== this.state.songId) {
      localStorage.historySong = JSON.stringify(this.state.songId)
      //FIXME : fix ..where..calll.... getHistorySong
      this.getHistorySong()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //songId 에 새로 추가한 곡이 없으면
    // console.log("nextprops", nextProps.historySong)
    // console.log("prevestate", prevState.songId)
    let prevSongId = prevState.songId
    const is = prevSongId.some(item => {
      return item === nextProps.historySong
    })
    if (!is) {
      // console.log("not contains")
      return {
        ...prevState,
        songId: [...prevState.songId, nextProps.historySong]
      }
    } else {
      return null
    }
  }
  //get Data From SoundColud
  getHistorySong = () => {
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
    })
  }
  //Render HistoryComponent from songData
  renderHistory = () =>
    this.state.songData.map((song, index) => (
      <HistoryComponent
        key={`history-${index}`}
        songId={song.id}
        artwork={song.artwork_url}
        duration={song.duration}
        title={song.title}
        singer={song.user.username}
      />
    ))
  render() {
    // ()
    console.log("songdata", this.state.songData)
    return (
      <div className={cx(`${moduleName}`)}>
        <div
          className={cx(`${moduleName}__Wrapper`)}
          style={{ color: "#ffffff" }}
        >
          {/*<button onClick={this._getHistorySong}>butn</button> */}
          {this.state.songData ? this.renderHistory() : "Loading"}
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
