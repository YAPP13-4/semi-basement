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
    song: null,
};

const PlayerContainer = (props) => {
    console.log('container test')
    const { song } = props;
    console.log('song',song)
    console.log('props',{...props})
    return song ? <Player {...props} /> : null;
    //return <Player {...props} />
}
PlayerContainer.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    //const songurl = (SONG_URL.replace(':id', state.music.song));\
    console.log('state to props',state.music.song)
    return {
      //song : songUrl
      song: state.music.song,
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