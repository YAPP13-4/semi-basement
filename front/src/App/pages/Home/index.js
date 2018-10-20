import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { changePlayList } from "../../../redux/playlist/actions"
import Navigation from "./components/Navigation/index"
import axios from "axios"
import { loadSongsInfo } from "src/redux/music/actions"
//TODO : FIX (with BE)
import SONG_URL_LIST from "../../constants/test/SongUrlConstants"
import SONG_URL_LIST1 from "../../constants/test/SongUrlConstants1"
import { resolveUrl } from "../../constants/ApiConstants"
import ArtWorkContainer from "../Home/container/ArtWrokContainer"
import classnames from "classnames/bind"
import css from "./index.scss"

const cx = classnames.bind(css)
const moduleName = "Home"

class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      sebaChoiceActive: false,
      knowListActive: false
    }
  }
  componentDidMount() {
    this.props.loadSongsInfo(SONG_URL_LIST1)
  }

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
  /*
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
  }*/
  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <Navigation />
        <div>
          <ArtWorkContainer category="SEBA'S CHOICE" />
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  {
    changePlayList,
    loadSongsInfo
  }
)(Home)
