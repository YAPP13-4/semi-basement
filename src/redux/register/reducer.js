import * as registerActions from './actions';
import {asyncState, PENDING, FULFILLED, REJECTED} from 'src/utils/ReduxUtils';

const INITIAL_STATE = {
  registMusicState: asyncState()
};

const register = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case registerActions.LOAD_SOUNDCLOUD_MUSIC_INFO:
      return {
        ...state,
        registMusicState: asyncState(PENDING)
      }
    case registerActions.LOAD_SOUNDCLOUD_MUSIC_INFO_SUCCESS:
      return {
        ...state,
        registMusicState: asyncState(FULFILLED)
      }
    case registerActions.LOAD_SOUNDCLOUD_MUSIC_INFO_FAILURE:
      return {
        ...state,
        registMusicState: asyncState(REJECTED)
      }
    default:
      return state;
  }
};

export default register;