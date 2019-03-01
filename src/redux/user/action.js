const PREFIX = 'USER';

export const USER_REQUEST = `${PREFIX}/REQUEST`;
export const USER_SUCCESS = `${PREFIX}/SUCCESS`;

export function fetchUserSuccess(userInfo) {
  return {
    type: USER_SUCCESS,
    userInfo,
  };
}
