import React from "react"
import { connect } from "react-redux"

import { addSongMyPlaylist } from "src/redux/myPlayer/actions"
import {
  onLoadedMetadata,
  onLoadStart,
  onPause,
  onPlay,
  onTimeUpdate,
  onVolumeChange,
  playSong,
  // addPlaylist,
  playNexSong,
  playPrevSong,
  toggleShuffle
} from "../../redux/player/actions"
//title, artwork, songId, singerName
import Player from "../components/Player"
import { toggleHistory } from "../../redux/meta/actions"

const defaultProps = {
  song: null
}

const PlayerContainer = props => {
  const { song } = props
  return song ? <Player {...props} /> : null
  //return <Player {...props} />
}
PlayerContainer.defaultProps = defaultProps

const mapStateToProps = ({ player, meta, music }) => {
  return {
    //song : songUrl
    meta,
    player,
    song: music.song
  }
}
export default connect(
  mapStateToProps,
  {
    onLoadedMetadata,
    onLoadStart,
    onPause,
    onPlay,
    onTimeUpdate,
    onVolumeChange,
    toggleHistory,
    playSong,
    toggleShuffle,
    playNexSong,
    playPrevSong,
    addSongMyPlaylist
  }
)(PlayerContainer)
