import React from "react"
import { connect } from "react-redux"

import {
  onLoadedMetadata,
  onLoadStart,
  onPause,
  onPlay,
  onTimeUpdate,
  onVolumeChange,
  playSong,
  playNexSong,
  playPrevSongFromButton
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
  //const songurl = (SONG_URL.replace(':id', state.music.song));\
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
    playNexSong,
    playPrevSongFromButton
  }
)(PlayerContainer)
