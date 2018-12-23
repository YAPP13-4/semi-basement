import { SEARCH_MUSIC_INFO_REQUEST } from './actions';
const search = (
  state = {
    searchKeyWord: '',
  },
  action,
) => {
  switch (action.type) {
    case SEARCH_MUSIC_INFO_REQUEST:
      return {
        ...state,
        searchKeyWord: action.searchKeyWord,
      };

    default:
      return state;
  }
};

export default search;
