import React, { PureComponent } from "react"
import { connect } from "react-redux"

import Navigation from "./components/Navigation"
import Loading from "src/App/components/Loading"
import Featured from "./components/Featured"
import { loadSongsInfo } from "src/redux/music/actions"
import { loadFirstSubSongInfo } from "src/redux/submusic1/actions"
//TODO : FIX (with BE)
import SONG_URL_LIST2 from "../../constants/test/SongUrlConstants2"
import SONG_URL_LIST1 from "../../constants/test/SongUrlConstants1"
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
    this.props.loadFirstSubSongInfo(SONG_URL_LIST2)
  }

  render() {
    return !this.props.mainMusicLoading && !this.props.subMusicLoading ? (
      <div className={cx(`${moduleName}`)}>
        <Navigation />
        <div>
          <ArtWorkContainer
            category="SEBA'S CHOICE"
            musicInfos={this.props.musicInfos}
          />
        </div>
        <div>
          <ArtWorkContainer
            category="YOU_KNOW"
            musicInfos={this.props.subMusicInfos1}
          />
        </div>
        <div>
          <Featured />
        </div>
      </div>
    ) : (
      <Loading />
    )
  }
}

export default connect(
  ({ submusic1, music }) => {
    return {
      subMusicInfos1: submusic1.musicInfo,
      musicInfos: music.musicInfo,
      mainMusicLoading: music.loading,
      subMusicLoading: submusic1.loading
    }
  },
  {
    loadSongsInfo,
    loadFirstSubSongInfo
  }
)(Home)
