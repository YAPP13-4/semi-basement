import React from 'react'
import { connect } from 'react-redux'

import {
  addMusicMyPlaylist,
  removeMusicMyPlaylist
} from 'src/redux/myPlayer/actions'
import Tooltip2 from 'src/components/Tooltip2'
import icons from 'src/assets/icons/icon2.png'

const MyPlayerTooltip = ({
  index,
  children,
  musicList,
  currentMusicListName,
  addMusicMyPlaylist,
  removeMusicMyPlaylist
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
        const musicId = musicList[index]
        addMusicMyPlaylist(musicId)
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
        background: `url(${icons}) no-repeat -280px -92px`,
        height: '17px',
        width: '20px',
        top: '20px',
        left: '20px'
      },
      action: e => {
        const musicId = musicList[index]
        removeMusicMyPlaylist(musicId)
        e.stopPropagation()
      }
    }
  }

  return <Tooltip2 tooltipList={tooltipList}>{children}</Tooltip2>
}

export default connect(
  ({ playList }) => ({
    musicList: playList.musicList,
    currentMusicListName: playList.currentList
  }),
  { addMusicMyPlaylist, removeMusicMyPlaylist }
)(MyPlayerTooltip)
