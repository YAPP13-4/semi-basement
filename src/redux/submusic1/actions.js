export const PREFIX = 'SUBMUSIC1';

export const LOAD_MUSIC_INFO = `${PREFIX}/LOAD_MUSIC_INFO`;
export const LOAD_MUSIC_INFO_REQUEST = `${PREFIX}/LOAD_MUSIC_INFO_REQUEST`;
export const LOAD_MUSIC_INFO_SUCCESS = `${PREFIX}/LOAD_MUSIC_INFO_SUCCESS`;
export const LOAD_MUSIC_INFO_FAILURE = `${PREFIX}/LOAD_MUSIC_INFO_FAILURE`;

export function loadFirstSubMusicInfo(musicArr) {
  return {
    type: LOAD_MUSIC_INFO,
    musicArr,
  };
}

export function loadMusicInfoRequest() {
  return {
    type: LOAD_MUSIC_INFO_REQUEST,
  };
}

export function loadMusicInfoSuccess(data) {
  return {
    type: LOAD_MUSIC_INFO_SUCCESS,
    data,
  };
}

export function loadMusicInfoFailure(err) {
  return {
    type: LOAD_MUSIC_INFO_FAILURE,
    err,
  };
}
