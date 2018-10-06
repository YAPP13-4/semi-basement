import React from "react";
import { connect } from "react-redux";

import {
  onLoadedMetadata,
  onLoadStart,
  onPause,
  onPlay,
  onTimeUpdate,
  onVolumeChange,
  playSong,
  playNextSongFromButton,
  playPrevSongFromButton
} from "../../redux/player/actions";
import { addPlaylist } from 'src/redux/myPlayer/actions.js'
//title, artwork, songId, singerName
import Player from "../components/Player";
import { toggleHistory } from "../../redux/meta/actions";

const defaultProps = {
  song: null
};

const PlayerContainer = props => {
  const { song } = props;
  return song ? <Player {...props} /> : null;
  //return <Player {...props} />
};
PlayerContainer.defaultProps = defaultProps;

const mapStateToProps = state => {
  //const songurl = (SONG_URL.replace(':id', state.music.song));\
  const { player } = state;
  const { meta } = state;
  const { music } = state;
  return {
    //song : songUrl
    meta,
    player,
    song: music.song
  };
};
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
    playNextSongFromButton,
    playPrevSongFromButton,
    addPlaylist
  }
)(PlayerContainer);
