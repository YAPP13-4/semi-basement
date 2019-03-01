import * as playerActions from './actions';

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
    case playerActions.ON_PLAY:
      return {
        ...state,
        isPlaying: true,
      };
    case playerActions.ON_PAUSE:
      return {
        ...state,
        isPlaying: false,
      };
    case playerActions.ON_LOADED_METADATA:
      return {
        ...state,
        duration: action.duration,
      };

    case playerActions.ON_TIME_UPDATE:
      return {
        ...state,
        currentTime: action.currentTime,
      };
    case playerActions.ON_VOLUME_CHANGE:
      return {
        ...state,
        muted: action.muted,
        volume: action.volume,
      };
    case playerActions.TOGGLE_SHUFFLE:
      return {
        ...state,
        shuffle: !state.shuffle,
      };
    case playerActions.PLAY_MUSIC:
      return {
        ...state,
        playingIndex: action.playingIndex,
        playlist: action.playlist,
      };
    case playerActions.CHANGE_MYPLAYER_CURRENT_TIME:
      return {
        ...state,
        myPlayerCurrentTime: action.myPlayerCurrentTime,
      };
    case playerActions.CHANGE_MYPLAYER_VOLUME:
      return {
        ...state,
        myPlayerVolume: action.myPlayerVolume,
      };
    case playerActions.PLAY_NEXT_MUSIC_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case playerActions.PLAY_NEXT_MUSIC_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case playerActions.PLAY_NEXT_MUSIC_FAILURE:
      return {
        ...state,
        loading: false,
        error: { ...action.err },
      };
    case playerActions.PLAY_PREV_MUSIC_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case playerActions.PLAY_PREV_MUSIC_SUCCESS:
      return {
        ...state,
        loading: false,
        musicInfo: { ...action.data },
      };
    case playerActions.PLAY_PREV_MUSIC_FAILURE:
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
