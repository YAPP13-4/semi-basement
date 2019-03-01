import * as playlistActions from './actions';

const myPlayList = JSON.parse(localStorage.getItem('myPlayList')) || [];

const initialState = {
  musicList: [...myPlayList],
  currentList: 'My PlayList',
  loading: false,
  err: null,
};

const playList = (state = initialState, action) => {
  switch (action.type) {
    case playlistActions.SELECT_PLAY_LIST_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case playlistActions.SELECT_PLAY_LIST_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        musicList: [...action.data],
        err: null,
      };
    case playlistActions.LOAD_NEW_LIST:
      return {
        ...state,
        musicList: action.playlist,
        currentList: action.currentList,
      };
    case playlistActions.SELECT_PLAY_LIST_FAILURE:
      return {
        ...state,
        loading: action.loading,
        err: action.err,
      };
    default:
      return state;
  }
};

export default playList;
