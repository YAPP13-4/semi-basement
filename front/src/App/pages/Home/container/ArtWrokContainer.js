import React, { PureComponent } from "react"
import { connect } from "react-redux"
import {
  selectSong,
  addHistory,
  loadSongDetail,
  loadSongsInfo
} from "src/redux/music/actions"

import Loading from "src/App/components/Loading"
import ArtworkPlay from "../components/ArtworkPlay"
import classnames from "classnames/bind"
import css from "./ArtWorkContainer.scss"

import selectIcon from "src/assets/icons/icon2.png"

const cx = classnames.bind(css)
const moduleName = "ArtWorkPlayContainer"

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
class ArtWorkPlayContainer extends PureComponent {
  onClickPlay = ({ songId, title, artworkUrl, duration }) => {
    this.props.selectSong([songId, title, artworkUrl, duration])
    this.props.addHistory(songId)
  }

  onClickSongDetail = songId => {
    this.props.loadSongDetail(songId)
  }

  renderArtworks = () => {
    return this.props.musicInfos.map(musicInfo => {
      return (
        <ArtworkPlay
          musicInfo={musicInfo}
          onClickPlay={this.onClickPlay}
          onClickSongDetail={this.onClickSongDetail}
        />
      )
    })
  }

  render() {
    return this.props.musicInfos ? (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-category`)}>
          <div style={activePalyList} className="patch-icon">
            {/*index.js로부터 categoryTitle 넘겨받기*/}
          </div>
          {/* 여기에 onClick Event 달기 */}
          <div className={cx(`${moduleName}-category-title`)}>
            {this.props.category}
          </div>
        </div>
        <div className={cx(`${moduleName}-songWrapper`)}>
          {this.renderArtworks()}
        </div>
      </div>
    ) : (
      <Loading />
    )
  }
}

const mapStateToProps = ({ music }) => {
  return {
    musicInfos: music.musicInfo
  }
}
export default connect(
  mapStateToProps,
  { selectSong, addHistory, loadSongDetail, loadSongsInfo }
)(ArtWorkPlayContainer)
