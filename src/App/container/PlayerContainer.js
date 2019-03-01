import React from 'react';
import { connect } from 'react-redux';

import { addMusicMyPlaylist } from 'src/redux/myPlayer/actions';
import {
  onLoadedMetadata,
  onLoadStart,
  onPause,
  onPlay,
  onTimeUpdate,
  onVolumeChange,
  playMusic,
  playNextMusic,
  playPrevMusic,
  toggleShuffle,
} from '../../redux/player/actions';
import Player from '../components/Player';
import { toggleHistory } from '../../redux/meta/actions';

const defaultProps = {
  music: null,
};

const PlayerContainer = props => {
  const { music } = props;
  return music ? <Player {...props} /> : null;
};
PlayerContainer.defaultProps = defaultProps;

const mapStateToProps = ({ player, meta, music }) => {
  return {
    meta,
    player,
    music: music.playingMusicInfo,
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
    playMusic,
    toggleShuffle,
    playNextMusic,
    playPrevMusic,
    addMusicMyPlaylist,
  },
)(PlayerContainer);
