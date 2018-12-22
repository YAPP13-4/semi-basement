import { LOAD_NEW_LIST } from './actions';

const myPlayList = JSON.parse(localStorage.getItem('myPlayList')) || [];

const initialState = {
  musicList: [...myPlayList],
  currentList: 'My PlayList',
};

const playList = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NEW_LIST:
      return {
        ...state,
        musicList: action.playlist,
        currentList: action.currentList,
      };
    default:
      return state;
  }
};

export default playList;
