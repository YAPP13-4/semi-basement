import * as registerActions from './actions';

const INIT_STATE = {};

const register = (state = INIT_STATE, action) => {
  switch (action.type) {
    case registerActions.LOAD_SOUNDCLOUD_MUSIC_INFO:
      return {
        ...state,
      }
    case registerActions.LOAD_SOUNDCLOUD_MUSIC_INFO_SUCCESS:
      return {
        ...state,
      }
    case registerActions.LOAD_SOUNDCLOUD_MUSIC_INFO_FAILURE:
      return {
        ...state,
      }
    default:
      return state;
  }
};

export default register;