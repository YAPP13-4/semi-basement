import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'

import { removeSongMyPlaylist } from 'src/redux/myPlayer/actions'
import { formatSeconds } from 'src/utils/NumberUtils'
import getImageUrl from 'src/utils/ImageUtils'
import IMAGE_SIZES from 'src/App/constants/ImageConstants'

import css from './PlayerListItem.scss'

const cx = classnames.bind(css)
const moduleName = 'PlayerListItem'

const PlayerListItem = ({
  info,
  index,
  musicList,
  onClickPlay,
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
        <p className={cx(`${moduleName}-center-top`)}>
          {info.title}
        </p>
        <p className={cx(`${moduleName}-center-bottom`)}>
          {info.username}
        </p>
      </div>
      <p className={cx(`${moduleName}-duration`)}>
        {formatSeconds(info.duration)}
      </p>
      <div
        className={cx(`${moduleName}-etc`)}
        onClick={e => {
          const songId = this.props.musicList[index]
          removeSongMyPlaylist(songId)
          e.stopPropagation()
        }}
      >
        <i />
      </div>
    </div>
  )
}

export default connect(
  ({ playList }) => ({ musicList: playList.musicList }),
  { removeSongMyPlaylist }
)(PlayerListItem)
