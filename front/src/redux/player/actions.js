import * as types from './ActionType';
import { selectSong } from '../music/actions'
export const onLoadedMetadata = duration => ({
    type: types.ON_LOADED_METADATA,
    duration,
  });
export const onLoadStart = () => ({
    type: types.ON_LOAD_START,
  });
  
  export const onPause = () => ({
    type: types.ON_PAUSE,
  });
  
  export const onPlay = () => ({
    type: types.ON_PLAY,
  });
  
  export const onTimeUpdate = currentTime => ({
    type: types.ON_TIME_UPDATE,
    currentTime,
  });
  
  export const onVolumeChange = (muted, volume) => ({
    type: types.ON_VOLUME_CHANGE,
    muted,
    volume,
  });
  
  export const playSong = (playlist, playingIndex) => ({
    type: types.PLAY_SONG,
    playlist,
    playingIndex,
  });
  export const playNextSong = () => (dispatch, getState) => {
    const state = getState();
    const currentSongInfoArray = state.music.song;

    if(localStorage.historySong) {
      const historyArr = JSON.parse(localStorage.historySong)
      //find currentSong index 
      //const currentSongIndex = historyArr.indexOf(currentSong)

      //have to play first music
      /*
      if(currentSongIndex === historyArr.length ) {
        dispatch(selectSong(0))
      }*/
    }
  }
  export const playNextSongFromButton = () => dispatch => dispatch(playNextSong())