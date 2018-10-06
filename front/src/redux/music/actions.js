import * as types from './ActionType';

export const NAME = 'MUSIC'

export function selectSong(song) {
  return {
    type: types.SELECT_SONG,
    song
  };
}
export function addHistory(historySong) {
  return {
    type: types.HISTORY_SONG,
    historySong
  };
}
/*
export const selectSong = song=> ({
    type: types.SELECT_SONG,
    song
})*/

export const LOAD_SONG_DETAIL = `${NAME}/LOAD_SONG_DETAIL`
export const LOAD_SONG_DETAIL_REQUEST = `${NAME}/LOAD_SONG_DETAIL_REQUEST`
export const LOAD_SONG_DETAIL_SUCCESS = `${NAME}/LOAD_SONG_DETAIL_SUCCESS`
export const LOAD_SONG_DETAIL_FAILURE = `${NAME}/LOAD_SONG_DETAIL_FAILURE`

export function loadSongDetail(songId) {
    return {
        type: LOAD_SONG_DETAIL,
        songId
    }
}

export function loadSongDetailRequest() {
    return {
        type: LOAD_SONG_DETAIL_REQUEST
    }
}

export function loadSongDetailSuccess(data) {
    return {
        type: LOAD_SONG_DETAIL_SUCCESS,
        data
    }
}

export function loadSongDetailFailure(err) {
    return {
        type: LOAD_SONG_DETAIL_FAILURE,
        err
    }
}
