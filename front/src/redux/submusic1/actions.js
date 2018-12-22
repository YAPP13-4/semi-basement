export const PREFIX = 'SUBMUSIC1';

export const LOAD_SONG_INFO = `${PREFIX}/LOAD_SONG_INFO`;
export const LOAD_SONG_INFO_REQUEST = `${PREFIX}/LOAD_SONG_INFO_REQUEST`;
export const LOAD_SONG_INFO_SUCCESS = `${PREFIX}/LOAD_SONG_INFO_SUCCESS`;
export const LOAD_SONG_INFO_FAILURE = `${PREFIX}/LOAD_SONG_INFO_FAILURE`;

export function loadFirstSubSongInfo(songArr) {
  return {
    type: LOAD_SONG_INFO,
    songArr,
  };
}

export function loadSongInfoRequest() {
  return {
    type: LOAD_SONG_INFO_REQUEST,
  };
}

export function loadSongInfoSuccess(data) {
  return {
    type: LOAD_SONG_INFO_SUCCESS,
    data,
  };
}

export function loadSongInfoFailure(err) {
  return {
    type: LOAD_SONG_INFO_FAILURE,
    err,
  };
}
