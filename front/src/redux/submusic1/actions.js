export const NAME = "SUBMUSIC1"
export const LOAD_SONG_INFO = `${NAME}/LOAD_SONG_INFO`
export const LOAD_SONG_INFO_REQUEST = `${NAME}/LOAD_SONG_INFO_REQUEST`
export const LOAD_SONG_INFO_SUCCESS = `${NAME}/LOAD_SONG_INFO_SUCCESS`
export const LOAD_SONG_INFO_FAILURE = `${NAME}/LOAD_SONG_INFO_FAILURE`

export function loadFirstSubSongInfo(songArr) {
  return {
    type: LOAD_SONG_INFO,
    songArr
  }
}

export function loadSongInfoRequest() {
  return {
    type: LOAD_SONG_INFO_REQUEST
  }
}

export function loadSongInfoSuccess(data) {
  return {
    type: LOAD_SONG_INFO_SUCCESS,
    data
  }
}

export function loadSongInfoFailure(err) {
  return {
    type: LOAD_SONG_INFO_FAILURE,
    err
  }
}
