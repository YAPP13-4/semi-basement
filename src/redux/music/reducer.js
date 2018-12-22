import {
  SELECT_SONG,
  HISTORY_SONG_REQUEST,
  HISTORY_SONG_SUCCESS,
  LOAD_SONG_DETAIL_REQUEST,
  LOAD_SONG_DETAIL_SUCCESS,
  LOAD_SONG_DETAIL_FAILURE,
  LOAD_SONG_INFO_REQUEST,
  LOAD_SONG_INFO_SUCCESS,
  LOAD_KEYWORD_MUSIC,
  LOAD_KEYWORD_MUSIC_SUCCESS,
  LOAD_KEYWORD_MUSIC_FAILURE,
} from './actions';

const music = (
  state = {
    playingMusic: null,
    loading: false,
    infoLoading: false,
    musicInfo: null,
    recommendMusicInfo1: null,
    recommendMusicInfo2: null,
    songDetail: null,
    historySong: [],
    searchKeyword: '',
    searchResult: null,
  },
  action,
) => {
  switch (action.type) {
    case LOAD_SONG_INFO_REQUEST:
      return {
        ...state,
        infoLoading: true,
      };

    case LOAD_SONG_INFO_SUCCESS:
      return {
        ...state,
        infoLoading: false,
        musicInfo: [...action.data],
      };
    case SELECT_SONG:
      return {
        ...state,
        playingMusic: action.playingMusic,
      };
    case HISTORY_SONG_REQUEST:
      return {
        ...state,
      };
    case HISTORY_SONG_SUCCESS:
      return {
        ...state,
        historySong: [...action.data],
      };
    case LOAD_SONG_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SONG_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        songDetail: { ...action.data },
      };
    case LOAD_SONG_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: { ...action.err },
      };
    case LOAD_KEYWORD_MUSIC:
      return {
        ...state,
        searchKeyword: action.keyword,
      };
    case LOAD_KEYWORD_MUSIC_SUCCESS:
      return {
        ...state,
        searchResult: { ...action.data },
      };
    case LOAD_KEYWORD_MUSIC_FAILURE:
      return {
        ...state,
        error: { ...action.err },
      };
    default:
      return state;
  }
};

export default music;
