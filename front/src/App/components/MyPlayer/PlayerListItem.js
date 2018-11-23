import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'

import {
  addSongMyPlaylist,
  removeSongMyPlaylist
} from 'src/redux/myPlayer/actions'
import { formatSeconds } from 'src/utils/NumberUtils'
import getImageUrl from 'src/utils/ImageUtils'
import IMAGE_SIZES from 'src/App/constants/ImageConstants'

import css from './PlayerListItem.scss'
import Tooltip from './Tooltip'
import MyPlayListTooltip from './MyPlayListTooltip'
import Tooltip2 from 'src/components/Tooltip2'

const cx = classnames.bind(css)
const moduleName = 'PlayerListItem'

const PlayerListItem = ({
  info,
  index,
  musicList,
  onClickPlay,
  addSongMyPlaylist,
  removeSongMyPlaylist
}) => {
  return (
    <div
      className={cx(`${moduleName}`)}
      key={index}
      onClick={() => {
        onClickPlay({
          songId: musicList[index],
          title: info.title,
          artworkUrl: info.artworkUrl,
          duration: info.duration
        })
      }}
    >
      <i className={cx(`${moduleName}-move`)} />
      <div
        className={cx(`${moduleName}-artwork`)}
        style={{
          backgroundImage: `url(${getImageUrl(
            info.artworkUrl,
            IMAGE_SIZES.SMALL
          )})`
        }}
      />
      <div className={cx(`${moduleName}-center`)}>
        <p className={cx(`${moduleName}-center-top`)}>{info.title}</p>
        <p className={cx(`${moduleName}-center-bottom`)}>{info.username}</p>
      </div>
      <p className={cx(`${moduleName}-duration`)}>
        {formatSeconds(info.duration)}
      </p>
      <div className={cx(`${moduleName}-etcWrapper`)}>
        {/* <Tooltip
          onClickAdd={e => {
            const songId = musicList[index]
            addSongMyPlaylist(songId)
            e.stopPropagation()
          }}
          onClickRemove={e => {
            const songId = musicList[index]
            removeSongMyPlaylist(songId)
            e.stopPropagation()
          }}
        >
          <div className={cx(`${moduleName}-etc`)}>
            <i />
          </div>
        </Tooltip> */}
        {/* <MyPlayListTooltip>
          <div className={cx(`${moduleName}-etc`)}>
            <i />
          </div>
        </MyPlayListTooltip> */}
        <Tooltip2>
          <div className={cx(`${moduleName}-etc`)}>
            <i />
          </div>
        </Tooltip2>
      </div>
    </div>
  )
}

export default connect(
  ({ playList }) => ({ musicList: playList.musicList }),
  { addSongMyPlaylist, removeSongMyPlaylist }
)(PlayerListItem)
