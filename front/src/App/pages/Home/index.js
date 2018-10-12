import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { changePlayList } from "../../../redux/playlist/actions"
import Navigation from "./components/Navigation/index"
import axios from "axios"
//TODO : FIX (with BE)
import SONG_URL_LIST from "../../constants/test/SongUrlConstants"
import SONG_URL_LIST1 from "../../constants/test/SongUrlConstants1"
import { resolveUrl } from "../../constants/ApiConstants"
import ArtworkPlay from "./components/ArtworkPlay"

import classnames from "classnames/bind"
import css from "./index.scss"

import selectIcon from "../../../assets/icons/icon2.png"

const cx = classnames.bind(css)
const moduleName = "Home"

const activePalyList = {
  cursor: "pointer",
  background: `url(${selectIcon}) no-repeat -49px -152px`,
  width: "35px",
  height: "35px"
}

const inactivePalyList = {
  cursor: "pointer",
  background: `url(${selectIcon}) no-repeat -111px -152px`,
  width: "35px",
  height: "35px"
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sebaSongInfo: [],
      knowSongInfo: [],
      sebaChoiceActive: false,
      knowListActive: false
    }
  }
  componentDidMount() {
    //console.log("sebaChoiceActive ", this.state.sebaChoiceActive) false
    //console.log("knowListActive ", this.state.knowListActive)  false
    this.requestSebaSongInfo()
    this.requestKnowSongInfo()
  }

  //TODO : 리팩토링.
  requestSebaSongInfo = () => {
    SONG_URL_LIST.map(url => {
      return axios.get(resolveUrl(url)).then(response => {
        this.setState(prevState => {
          return {
            ...prevState,
            sebaSongInfo: [...prevState.sebaSongInfo, response.data]
          }
        })
      })
    })
  }
  requestKnowSongInfo = () => {
    SONG_URL_LIST1.map(url => {
      return axios.get(resolveUrl(url)).then(response => {
        this.setState(prevState => {
          return {
            ...prevState,
            knowSongInfo: [...prevState.knowSongInfo, response.data]
          }
        })
      })
    })
  }
  /*
  requestSongInfo = (songUrl, infoArray) => {
    console.log("request song info ", infoArray)
    songUrl.map(url => {
      return axios.get(resolveUrl(url)).then(response => {
        //2d array state ?
        this.setState(prevState => {
          console.log("request song info ", infoArray)
          console.log("request song info prevState ", prevState)
          return {
            ...prevState,
            infoArray: [...prevState.infoArray, response.data]
          }
        })
      })
    })
  }
  */
  //plya list : kind of music list
  dispatchPlayList = playlist => {
    //this.props.changePlayList()
    //songId 만 redux,.
    if (playlist === "SEBA_CHOICE") {
      const songId = this.state.sebaSongInfo.map(info => {
        console.log("info", info)
        if (!songId) return info.id
        else return songId.concat(info.id)
      })
      console.log("songid", songId)
      this.props.changePlayList(songId)
      console.log("sebaChoiceActive ", this.state.sebaChoiceActive)
      this.setState(prevState => {
        return {
          sebaChoiceActive: !prevState.sebaChoiceActive
        }
      })
    } else if (playlist === "YOU_KNOW") {
      const songId = this.state.knowSongInfo.map(info => {
        if (!songId) return info.id
        else return songId.concat(info.id)
      })

      this.props.changePlayList(songId)
      console.log("knowListActive ", this.state.knowListActive)
      this.setState(prevState => {
        return {
          knowListActive: !prevState.knowListActive
        }
      })
    }
  }
  rederDiscover = infoArray => {
    const songs = infoArray.map((songInfo, index) => {
      return (
        <ArtworkPlay
          key={index}
          singerName={songInfo.user.permalink}
          duration={songInfo.duration}
          title={songInfo.title}
          artwork={songInfo.artwork_url}
          songId={songInfo.id}
        />
      )
    })
    return songs
  }
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <Navigation />
        <div className={cx(`${moduleName}-category`)}>
          <div
            style={
              this.state.sebaChoiceActive ? activePalyList : inactivePalyList
            }
            onClick={() => {
              this.dispatchPlayList("SEBA_CHOICE")
            }}
          />
          <div className={cx(`${moduleName}-category-title`)}>
            SEBA's Choice
          </div>
        </div>
        <div className={cx(`${moduleName}-songWrapper`)}>
          {this.state.sebaSongInfo
            ? this.rederDiscover(this.state.sebaSongInfo)
            : "Loading"}
        </div>

        <div className={cx(`${moduleName}-category`)}>
          <div
            style={
              this.state.knowListActive ? activePalyList : inactivePalyList
            }
            onClick={() => {
              this.dispatchPlayList("YOU_KNOW")
            }}
          />
          <div className={cx(`${moduleName}-category-title`)}>
            Artists you should know
          </div>
        </div>
        <div className={cx(`${moduleName}-songWrapper`)}>
          {this.state.knowSongInfo
            ? this.rederDiscover(this.state.knowSongInfo)
            : "Loading"}
        </div>
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changePlayList }, dispatch)
}
export default connect(
  null,
  mapDispatchToProps
)(Home)
