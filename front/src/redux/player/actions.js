import * as types from './ActionType';

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
