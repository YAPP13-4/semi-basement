import React from 'react';
import { connect } from 'react-redux';

import {
    onLoadedMetadata,
    onLoadStart,
    onPause,
    onPlay,
    onTimeUpdate,
    onVolumeChange,
    playSong
} from '../../redux/player/actions'
//title, artwork, songId, singerName
import Player from '../components/Player'

const defaultProps = {
    song: null,
};

const PlayerContainer = (props) => {
    const { song } = props;
    return song ? <Player {...props} /> : null;
    //return <Player {...props} />
}
PlayerContainer.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    //const songurl = (SONG_URL.replace(':id', state.music.song));\
    const { player } = state
    return {
      //song : songUrl
      player,
      song: state.music.song,
    };
  };
  export default connect(mapStateToProps, {
    onLoadedMetadata, 
    onLoadStart,
    onPause,
    onPlay,
    onTimeUpdate,
    onVolumeChange,
    playSong,
  })(PlayerContainer);