import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { selectSong, addHistory, loadSongDetail } from "src/redux/music/actions"
import { changePlayList } from "src/redux/playlist/actions"
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
  onClickChangePlayList = playlist => {
    if (!this.props.currentList || this.props.currentList !== playlist) {
      const songId = this.props.musicInfos.map(info => { //계속 뮤직인포만 바라보고 있는건가..? 뮤직인포가 플레이리스트에 띠라 담기는것들이 달라져야 한다.
        if (!songId) return info.id
        else return songId.concat(info.id)
      })
      this.props.changePlayList(songId, playlist) // songIds만 배열로 넘겨주고 있는데, 어떻게 하는것이 맞는걸까? 마이 플레이 리스트에서 보여줄때, 상세정보들을 알아야 하기때문에, 일일히 url을 call해서 보여주어야 하나?(해보고 성능상 괜찮다면, redux에 id의 배열만 넣어주는것도 상태를 적게관리 하는 측면에서는 좋은 방법이다.)
    }
  }
  renderArtworks = () => {
    if (this.props.category === "SEBA'S CHOICE") {
      return this.props.musicInfos.map(musicInfo => {
        return (
          <ArtworkPlay
            key={musicInfo.id}
            musicInfo={musicInfo}
            onClickPlay={this.onClickPlay}
          />
        )
      })
    } else if (this.props.category === "YOU_KNOW") {
      console.log("music info ", this.props.subMusicInfo1)
      return this.props.subMusicInfo1.map(musicInfo => {
        return (
          <ArtworkPlay
            key={musicInfo.id}
            musicInfo={musicInfo}
            onClickPlay={this.onClickPlay}
          />
        )
      })
    }
  }

  render() {
    return this.props.musicInfos && this.props.subMusicInfo1 ? (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-category`)}>
          <div
            style={activePalyList}
            onClick={() => {
              this.onClickChangePlayList(this.props.category)
            }}
            className="patch-icon"
          />
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

const mapStateToProps = ({ music, playList, submusic1 }) => {
  return {
    subMusicInfo1: submusic1.musicInfo,
    musicInfos: music.musicInfo,
    currentList: playList.currentList
  }
}
export default connect(
  mapStateToProps,
  { selectSong, addHistory, loadSongDetail, changePlayList }
)(ArtWorkPlayContainer)