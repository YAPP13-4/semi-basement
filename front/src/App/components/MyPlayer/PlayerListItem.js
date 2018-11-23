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
import icons from 'src/assets/icons/icon2.png'

const cx = classnames.bind(css)
const moduleName = 'PlayerListItem'

const PlayerListItem = ({
  info,
  index,
  musicList,
  currentMusicListName,
  onClickPlay,
  addSongMyPlaylist,
  removeSongMyPlaylist
}) => {
  const tooltipList = [
    {
      name: 'add',
      icon: {
        background: `url(${icons}) no-repeat -280px -123px`,
        height: '17px',
        width: '20px',
        top: '20px',
        left: '20px'
      },
      action: e => {
        const songId = musicList[index]
        addSongMyPlaylist(songId)
        e.stopPropagation()
      }
    },
    {
      name: 'share',
      icon: {
        background: `url(${icons}) no-repeat -389px -89px`,
        width: '19px',
        height: '21px',
        top: '18px',
        left: '20px'
      },
      action: () => alert('share!')
    },
    {
      name: 'like',
      icon: {
        background: `url(${icons}) no-repeat -276px -40px`,
        height: '16px',
        width: '20px',
        top: '20px',
        left: '20px'
      },
      action: () => alert('like!')
    }
  ]

  if (currentMusicListName === 'My PlayList') {
    tooltipList[0] = {
      name: 'remove',
      icon: {
        background: `url(${icons}) no-repeat -280px -123px`,
        height: '17px',
        width: '20px',
        top: '20px',
        left: '20px'
      },
      action: e => {
        const songId = musicList[index]
        removeSongMyPlaylist(songId)
        e.stopPropagation()
      }
    }
  }

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
        <Tooltip2 tooltipList={tooltipList}>
          <div className={cx(`${moduleName}-etc`)}>
            <i />
          </div>
        </Tooltip2>
      </div>
    </div>
  )
}

export default connect(
  ({ playList }) => ({
    musicList: playList.musicList,
    currentMusicListName: playList.currentList
  }),
  { addSongMyPlaylist, removeSongMyPlaylist }
)(PlayerListItem)
