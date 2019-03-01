import * as userActions from './action';

const initialState = {
  userInfo: null,
};

const userInfo = (state = initialState, action) => {
  switch (action.type) {
    case userActions.USER_SUCCESS:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    default:
      return state;
  }
};

export default userInfo;
