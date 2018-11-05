import React, { PureComponent } from "react"
import classnames from "classnames/bind"
import css from "./HistoryComponent.scss"
import IMAGE_SIZES from "../../constants/ImageConstants"
import getImageUrl from "../../../utils/ImageUtils"
import { selectSong } from "../../../redux/music/actions"
import { connect } from "react-redux"
import { onPlay, onPause } from "src/redux/player/actions"
import { bindActionCreators } from "redux"
import selectIcon from "src/assets/icons/icon2.png"
const cx = classnames.bind(css)
const moduleName = "HistoryComponent"

const pauseIcon = {
  background: `url(${selectIcon}) no-repeat -115px -236px`,
  width: "22px",
  height: "26px"
}
const playIcon = {
  background: `url(${selectIcon}) no-repeat -115px -320px`,
  width: "22px",
  height: "26px"
}
class HistoryComponent extends PureComponent {
  state = {
    toggle: false,
    selectMusic: false,
    iconStyle: null
  }
  artowrkClickEvent = () => {
    console.log("artwork click event")
    this.fetchSong()
    this.setState(prevState => {
      return {
        ...prevState,
        //historyTab의 Artwork를 반복해서 누르는 경우 css를 다르게 처리하기 위함
        selectMusic: !prevState.selectMusic,
        iconStyle: pauseIcon
      }
    })
  }
  artowrkMouseOver = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        iconStyle: playIcon
      }
    })
  }
  artowrkMouseOut = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        iconStyle: null
      }
    })
  }
  fetchSong = () => {
    const songInfo = [
      this.props.songId,
      this.props.title,
      this.props.artwork,
      this.props.duration / 1000
    ]
    this.props.selectSong(songInfo)
  }

  render() {
    return (
      <div className={cx(`${moduleName}`)} style={{ display: "flex" }}>
        <div
          className={cx(`${moduleName}__artwork`)}
          onClick={this.artowrkClickEvent}
          style={{
            backgroundImage: `url(${getImageUrl(
              this.props.artwork,
              IMAGE_SIZES.XLARGE
            )})`
          }}
          onMouseOver={this.artowrkMouseOver}
          onMouseOut={this.artowrkMouseOut}
        >
          <div style={this.state.iconStyle ? this.state.iconStyle : null} />
        </div>
        <div>
          <div className={cx(`${moduleName}__title`)}>{this.props.title}</div>
          <div className={cx(`${moduleName}__singer`)}>{this.props.singer}</div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { meta, palyer } = state
  return {
    toggleHistory: meta.toggleHistory,
    player: palyer
  }
}
export default connect(
  mapStateToProps,
  {
    selectSong,
    onPlay,
    onPause
  }
)(HistoryComponent)
