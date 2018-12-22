import {
  LOAD_SONG_INFO_REQUEST,
  LOAD_SONG_INFO_SUCCESS,
  LOAD_SONG_INFO_FAILURE,
} from './actions';

const initialState = {
  loading: false,
  musicInfo: null,
};

const submusic1 = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SONG_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SONG_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        musicInfo: [...action.data],
      };
    case LOAD_SONG_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: { ...action.err },
      };
    default:
      return state;
  }
};

export default submusic1;
