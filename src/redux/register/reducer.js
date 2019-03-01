import * as registerActions from './actions';
import {asyncState, PENDING, FULFILLED, REJECTED} from 'src/utils/ReduxUtils';

const INITIAL_STATE = {
  registMusic : {
    artworkImg: '',
    description: '',
    musician: '',
    title: ''
  },
  registMusicState: asyncState()
};

const register = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case registerActions.LOAD_SOUNDCLOUD_MUSIC_INFO:
    case registerActions.REGIST_SOUNDCLOUD_MUSIC:
      return {
        ...state,
        registMusicState: asyncState(PENDING)
      }
    case registerActions.LOAD_SOUNDCLOUD_MUSIC_INFO_SUCCESS:
      return {
        ...state,
        registMusic: action.data,
        registMusicState: asyncState(FULFILLED)
      }
    case registerActions.LOAD_SOUNDCLOUD_MUSIC_INFO_FAILURE:
      return {
        ...state,
        registMusicState: asyncState(REJECTED)
      }
    case registerActions.RESET_REGIST_MUSIC_STATE:
      return {
        ...state,
        registMusicState: asyncState()
      }
    default:
      return state;
  }
};

export default register;