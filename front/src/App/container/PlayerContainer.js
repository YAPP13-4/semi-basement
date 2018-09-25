import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SONG_URL } from '../constants/ApiConstants'
import {
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
    audioUrl: null,
};

const PlayerContainer = (props) => {
    console.log('container test')
    const { audioUrl } = props;
    console.log('song',audioUrl)
    //return song ? <Player {...props} /> : null;
    return <Player {...props} />
}
PlayerContainer.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    const songurl = (SONG_URL.replace(':id', state.music.song));
    return {
      //song : songUrl
      audioUrl: songurl,
    };
  };
  export default connect(mapStateToProps, {
    onLoadStart,
    onPause,
    onPlay,
    onTimeUpdate,
    onVolumeChange,
    playSong,
  })(PlayerContainer);