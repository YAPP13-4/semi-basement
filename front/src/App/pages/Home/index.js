import React, { PureComponent } from "react"
import { connect } from "react-redux"

import Navigation from "./components/Navigation/index"
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
    return (
      <div className={cx(`${moduleName}`)}>
        <Navigation />
        <div>
          <ArtWorkContainer category="SEBA'S CHOICE" />
        </div>
        <div>
          <ArtWorkContainer category="YOU_KNOW" />
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  {
    loadSongsInfo,
    loadFirstSubSongInfo
  }
)(Home)
