import React from "react"
import classnames from "classnames/bind"
import css from "./ChartTabItem.scss"
import IMAGE_SIZES from "../../../constants/ImageConstants"
import getImageUrl from "../../../../utils/ImageUtils"
const cx = classnames.bind(css)
const moduleName = "ChartTabContainer"

const ChartTabItem = ({ musicInfo, onClickPlay, onClickSongDetail, ind }) => {
  console.log("music info ", musicInfo)
  const songId = musicInfo.id
  const title = musicInfo.title
  const creator = musicInfo.user.username
  const artworkUrl = musicInfo.artwork_url
  const duration = musicInfo.duration / 1000
  const min = Math.ceil(this.duration / 1000 / 60)
  const sec = Math.ceil(this.duration / 1000) % 60
  //FIX ME : WITH BE
  const playCount = (musicInfo.playback_count / 1000000).toFixed(2)
  const likeCount = (musicInfo.favoritings_count / 1000000).toFixed(2)
  return (
    <tr className={cx(`${moduleName}`)}>
      <td>{ind + 1} </td>
      <td
        className={cx(`${moduleName}-thumbnail`)}
        onClick={() => {
          onClickPlay({ songId, title, artworkUrl, duration })
        }}
      >
        <img
          src={`${getImageUrl(artworkUrl, IMAGE_SIZES.SMALL)}`}
          alt="artwork"
        />
      </td>
      <td
        className={cx(`${moduleName}-title`)}
        onClick={() => {
          onClickSongDetail(songId)
        }}
      >
        {title}
      </td>
      <td className={cx(`${moduleName}-singer`)}>{creator}</td>
      <td className={cx(`${moduleName}-time`)}>
        {min} : {sec}
      </td>
      <td>
        <span className={cx(`${moduleName}-likeIcon`)} />{" "}
      </td>
      <td>{likeCount}</td>
      <td>
        <span className={cx(`${moduleName}-playIcon`)} />{" "}
      </td>
      <td>{playCount}m</td>
      <td>
        <span className={cx(`${moduleName}-addListIcon`)} />
      </td>
    </tr>
  )
}
export default ChartTabItem
