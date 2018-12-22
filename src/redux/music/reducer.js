import * as musicActions from "./actions"

const music = (
  state = {
    playingMusic: null,
    loading: false,
    infoLoading: false,
    musicInfo: null,
    recommendMusicInfo1: null,
    recommendMusicInfo2: null,
    musicDetail: null,
    historyMusic: [],
    searchKeyword: '',
    searchResult: null,
  },
  action,
) => {
  switch (action.type) {
    case musicActions.LOAD_MUSIC_INFO_REQUEST:
      return {
        ...state,
        infoLoading: true,
      };

    case musicActions.LOAD_MUSIC_INFO_SUCCESS:
      return {
        ...state,
        infoLoading: false,
        musicInfo: [...action.data],
      };
    case musicActions.SELECT_MUSIC:
      return {
        ...state,
        playingMusic: action.playingMusic,
      };
    case musicActions.HISTORY_MUSIC_REQUEST:
      return {
        ...state,
      };
    case musicActions.HISTORY_MUSIC_SUCCESS:
      return {
        ...state,
        historyMusic: [...action.data],
      };
    case musicActions.LOAD_MUSIC_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case musicActions.LOAD_MUSIC_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        musicDetail: { ...action.data },
      };
    case musicActions.LOAD_MUSIC_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: { ...action.err },
      };
    case musicActions.LOAD_KEYWORD_MUSIC:
      return {
        ...state,
        searchKeyword: action.keyword,
      };
    case musicActions.LOAD_KEYWORD_MUSIC_SUCCESS:
      return {
        ...state,
        searchResult: { ...action.data },
      };
    case musicActions.LOAD_KEYWORD_MUSIC_FAILURE:
      return {
        ...state,
        error: { ...action.err },
      };
    default:
      return state;
  }
};

export default music;
