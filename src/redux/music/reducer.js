import * as musicActions from './actions';
import {defaultCover} from 'src/assets/default_cover';

const music = (
  state = {
    playingMusicInfo: {
      id: null,
      title: "음악을 선택해 주세요",
      musician: '',
      artworkImg: defaultCover[Math.floor(Math.random()*5)],
      streamUrl: '',
      duration: 0
    },
    loading: true,
    infoLoading: false,
    musicInfo: [],
    musicDetail: {
      music: {
        artworkImg: '',
        title: '',
      },
      featured: []
    },
    historyMusic: [],
    searchKeyword: '',
    searchResult: null,
    musicListName: null,
  },
  action,
) => {
  switch (action.type) {
    case musicActions.LOAD_MUSIC_INFO:
      return {
        ...state,
        musicListName: action.musicListName,
      };
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
        playingMusicInfo: action.playingMusicInfo,
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
        musicDetail: {...action.data},
      };
    case musicActions.LOAD_MUSIC_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: {...action.err},
      };
    case musicActions.LOAD_KEYWORD_MUSIC:
      return {
        ...state,
        searchKeyword: action.keyword,
      };
    case musicActions.LOAD_KEYWORD_MUSIC_SUCCESS:
      return {
        ...state,
        searchResult: {...action.data},
      };
    case musicActions.LOAD_KEYWORD_MUSIC_FAILURE:
      return {
        ...state,
        error: {...action.err},
      };
    default:
      return state;
  }
};

export default music;
