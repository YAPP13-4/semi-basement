import React from "react"
import { Link } from "react-router-dom"
import classnames from "classnames/bind"
import getImageUrl from "src/utils/ImageUtils"
import css from "./ArtworkPlay.scss"
import IMAGE_SIZES from "../../../constants/ImageConstants"

const cx = classnames.bind(css)
const moduleName = "ArtworkPlay"

const ArtWorkPlay = ({ music, selectSong, addHistory, loadSongDetail }) => {
  console.log("props music", music)
  const { musicInfo } = music
  console.log("musicinfo ", musicInfo)
  const songId = musicInfo.id
  const title = musicInfo.title
  const creator = musicInfo.user.username
  const artworkUrl = musicInfo.artwork_url
  const duration = musicInfo.duration / 1000

  return (
    <div className={cx(`${moduleName}`)}>
      <div className={cx(`${moduleName}-row`)}>
        <div className={cx(`${moduleName}-row__cell`)}>
          <div className={cx(`${moduleName}-song-body-card`)}>
            <div
              className={cx(`${moduleName}-song-body-card-artwork`)}
              //FIX ME
              onClick={() => {
                selectSong([songId, title, artworkUrl, duration])
                addHistory(songId)
              }}
              style={{
                backgroundImage: `url(${getImageUrl(
                  artworkUrl,
                  IMAGE_SIZES.XLARGE
                )})`
              }}
            >
              <div className={cx(`${moduleName}-song-body-card-playicon`)} />
            </div>

            <Link
              className={cx(`${moduleName}-song-body-card-link`)}
              to="/songDetail"
              //FIXME
              onClick={() => {
                loadSongDetail(songId)
              }}
            >
              <div className={cx(`${moduleName}-song-body-card-info`)}>
                <div className={cx(`${moduleName}-song-body-card-title`)}>
                  {title}
                </div>
                <div className={cx(`${moduleName}-song-body-card-singer`)}>
                  {creator}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ArtWorkPlay
/*
class ArtworkPlay extends Component {
  static defaultProps = {
    singerName: "Creator",
    title: "Title",
    artwork: "ArtWork"
  }
  _fetchSong = () => {
    //이 부분에 배열로 담아서 store에 저장하기.
    console.log("click", this.props.songId)
    //son id, title, artwork, duration --> song array
    const songInfo = [
      this.props.songId,
      this.props.title,
      this.props.artwork,
      this.props.duration / 1000
    ]
    console.log("songinfo", songInfo)
    this.props.selectSong(songInfo)
    this.props.addHistory(songInfo[0])
  }
  getSongDetail = () => {
    this.props.loadSongDetail(this.props.songId)
  }
  render() {
    const artworkUrl = this.props.artwork
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-row`)}>
          <div className={cx(`${moduleName}-row__cell`)}>
            <div className={cx(`${moduleName}-song-body-card`)}>
              <div
                className={cx(`${moduleName}-song-body-card-artwork`)}
                onClick={this._fetchSong}
                style={{
                  backgroundImage: `url(${getImageUrl(
                    artworkUrl,
                    IMAGE_SIZES.XLARGE
                  )})`
                }}
              >
                <div className={cx(`${moduleName}-song-body-card-playicon`)} />
              </div>

              <Link
                className={cx(`${moduleName}-song-body-card-link`)}
                to="/songDetail"
                onClick={this.getSongDetail}
              >
                <div className={cx(`${moduleName}-song-body-card-info`)}>
                  <div className={cx(`${moduleName}-song-body-card-title`)}>
                    {this.props.title}
                  </div>
                  <div className={cx(`${moduleName}-song-body-card-singer`)}>
                    {this.props.singerName}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
*/
