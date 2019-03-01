import * as Actions from './actions';

const unsplashInfo = (
  state = {
    requestInfo: null,
    pictureList: null,
    err: null,
  },
  action,
) => {
  switch (action.type) {
    case Actions.REQUEST:
      return {
        ...state,
        requestInfo: action.reqInfo,
      };
    case Actions.SUCCESS:
      return {
        ...state,
        pictureList: [...action.payload],
      };
    case Actions.FAIL:
      return {
        ...state,
        err: action.err,
      };
    default:
      return state;
  }
};

export default unsplashInfo;
