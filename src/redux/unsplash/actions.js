const PREFIX = 'UNSPLASH';

export const REQUEST = `${PREFIX}/REQUEST`;
export const SUCCESS = `${PREFIX}/SUCCESS`;
export const FAIL = `${PREFIX}/FAIL`;

export function unsplashImageRequest(requestInfo) {
  return {
    type: REQUEST,
    reqInfo: requestInfo,
  };
}

export function unsplashImageSuccess(res) {
  return {
    type: SUCCESS,
    payload: res,
  };
}

export function unsplashImageFail(err) {
  return {
    type: FAIL,
    err,
  };
}
