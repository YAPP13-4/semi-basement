import React from 'react'
import { connect } from 'react-redux'

import {
  addSongMyPlaylist,
  removeSongMyPlaylist
} from 'src/redux/myPlayer/actions'
import Tooltip2 from 'src/components/Tooltip2'
import icons from 'src/assets/icons/icon2.png'

const MyPlayerTooltip = ({
  index,
  children,
  musicList,
  currentMusicListName,
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
        // TODO: 으하... songId를 얻기위해 index를 이렇게 따로 들고 다녀야 하는건 ㅠㅠㅠ 꼭 데이터 구조를 Object로 바꾸자....
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
        background: `url(${icons}) no-repeat -280px -92px`,
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

  return <Tooltip2 tooltipList={tooltipList}>{children}</Tooltip2>
}

export default connect(
  ({ playList }) => ({
    musicList: playList.musicList,
    currentMusicListName: playList.currentList
  }),
  { addSongMyPlaylist, removeSongMyPlaylist }
)(MyPlayerTooltip)
