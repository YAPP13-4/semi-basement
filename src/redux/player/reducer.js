import {
  ON_PAUSE,
  ON_LOADED_METADATA,
  ON_PLAY,
  ON_TIME_UPDATE,
  ON_VOLUME_CHANGE,
  CHANGE_MYPLAYER_CURRENT_TIME,
  CHANGE_MYPLAYER_VOLUME,
  TOGGLE_SHUFFLE,
  PLAY_SONG,
  PLAY_NEXT_SONG_SUCCESS,
  PLAY_NEXT_SONG_REQUEST,
  PLAY_NEXT_SONG_FAILURE,
  PLAY_PREV_SONG_SUCCESS,
  PLAY_PREV_SONG_REQUEST,
  PLAY_PREV_SONG_FAILURE,
} from './actions';

const initialState = {
  currentTime: 0,
  myPlayerCurrentTime: 0,
  myPlayerVolume: 1,
  duration: 0,
  isPlaying: false,
  muted: false,
  repeat: false,
  shuffle: false,
  volume: 1,
  playingIndex: null,
  playlist: null,
};

const player = (state = initialState, action) => {
  switch (action.type) {
    case ON_PAUSE:
      return {
        ...state,
        isPlaying: false,
      };
    case ON_LOADED_METADATA:
      return {
        ...state,
        duration: action.duration,
      };
    case ON_PLAY:
      return {
        ...state,
        isPlaying: true,
      };
    case ON_TIME_UPDATE:
      return {
        ...state,
        currentTime: action.currentTime,
      };
    case ON_VOLUME_CHANGE:
      return {
        ...state,
        muted: action.muted,
        volume: action.volume,
      };
    case TOGGLE_SHUFFLE:
      return {
        ...state,
        shuffle: !state.shuffle,
      };
    case PLAY_SONG:
      return {
        ...state,
        playingIndex: action.playingIndex,
        playlist: action.playlist,
      };
    case CHANGE_MYPLAYER_CURRENT_TIME:
      return {
        ...state,
        myPlayerCurrentTime: action.myPlayerCurrentTime,
      };
    case CHANGE_MYPLAYER_VOLUME:
      return {
        ...state,
        myPlayerVolume: action.myPlayerVolume,
      };
    case PLAY_NEXT_SONG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PLAY_NEXT_SONG_SUCCESS:
      return {
        ...state,
        loading: false,
        songInfo: { ...action.data },
      };
    case PLAY_NEXT_SONG_FAILURE:
      return {
        ...state,
        loading: false,
        error: { ...action.err },
      };
    case PLAY_PREV_SONG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PLAY_PREV_SONG_SUCCESS:
      return {
        ...state,
        loading: false,
        songInfo: { ...action.data },
      };
    case PLAY_PREV_SONG_FAILURE:
      return {
        ...state,
        loading: false,
        error: { ...action.err },
      };
    default:
      return state;
  }
};

export default player;
