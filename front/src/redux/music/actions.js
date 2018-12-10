export const SELECT_SONG = 'SELECT_SONG';
export const HISTORY_SONG = 'HISTORY_SONG';
export const HISTORY_SONG_REQUEST = 'HISTORY_SONG_REQUEST';
export const HISTORY_SONG_SUCCESS = 'HISTORY_SONG_SUCCESS';
export const HISTORY_SONG_FAILURE = 'HISTORY_SONG_FAILURE';
export const LANDING = 'LANDING';
export const FETCH_NEW_STREAM_SONGS_SUCCESS = 'FETCH_NEW_STREAM_SONGS_SUCCESS';
export const FETCH_SONGS_REQUEST = 'FETCH_SONGS_REQUEST';
export const FETCH_SONGS_SUCCESS = 'FETCH_SONGS_SUCCESS';
export const NAME = 'MUSIC';
export const LOAD_SONG_INFO = 'LOAD_SONG_INFO';
export const LOAD_SONG_INFO_REQUEST = 'LOAD_SONG_INFO_REQUEST';
export const LOAD_SONG_INFO_SUCCESS = 'LOAD_SONG_INFO_SUCCESS';
export const LOAD_SONG_INFO_FAILURE = 'LOAD_SONG_INFO_FAILURE';

//new action
export function loadSongsInfo(songUrlArr) {
  return {
    type: LOAD_SONG_INFO,
    songUrlArr,
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

//Legacy actions
export function historySong(songId) {
  return {
    type: HISTORY_SONG,
    songId,
  };
}
export function historySongRequest() {
  return {
    type: HISTORY_SONG_REQUEST,
  };
}
export function historySongSuccess(data) {
  return {
    type: HISTORY_SONG_SUCCESS,
    data,
  };
}
export function historySongFailure(err) {
  return {
    type: HISTORY_SONG_FAILURE,
    err,
  };
}
export function selectSong(playingMusic) {
  return {
    type: SELECT_SONG,
    playingMusic,
  };
}
/*
export function addHistory(historySong) {
  return {
    type: HISTORY_SONG,
    historySong
  }
}*/

export const LOAD_SONG_DETAIL = `${NAME}/LOAD_SONG_DETAIL`;
export const LOAD_SONG_DETAIL_REQUEST = `${NAME}/LOAD_SONG_DETAIL_REQUEST`;
export const LOAD_SONG_DETAIL_SUCCESS = `${NAME}/LOAD_SONG_DETAIL_SUCCESS`;
export const LOAD_SONG_DETAIL_FAILURE = `${NAME}/LOAD_SONG_DETAIL_FAILURE`;

export function loadSongDetail(songId) {
  return {
    type: LOAD_SONG_DETAIL,
    songId,
  };
}

export function loadSongDetailRequest() {
  return {
    type: LOAD_SONG_DETAIL_REQUEST,
  };
}

export function loadSongDetailSuccess(data) {
  return {
    type: LOAD_SONG_DETAIL_SUCCESS,
    data,
  };
}

export function loadSongDetailFailure(err) {
  return {
    type: LOAD_SONG_DETAIL_FAILURE,
    err,
  };
}

export const LOAD_KEYWORD_MUSIC = `${NAME}/LOAD_KEYWORD_MUSIC`;
export const LOAD_KEYWORD_MUSIC_REQUEST = `${NAME}/LOAD_KEYWORD_MUSIC_REQUEST`;
export const LOAD_KEYWORD_MUSIC_SUCCESS = `${NAME}/LOAD_KEYWORD_MUSIC_SUCCESS`;
export const LOAD_KEYWORD_MUSIC_FAILURE = `${NAME}/LOAD_KEYWORD_MUSIC_FAILURE`;

export function loadKeywordMusic(keyword) {
  return {
    type: LOAD_KEYWORD_MUSIC,
    keyword,
  };
}

export function loadKeywordMusicRequest() {
  return {
    type: LOAD_KEYWORD_MUSIC_REQUEST,
  };
}

export function loadKeywordMusicSuccess(data) {
  return {
    type: LOAD_KEYWORD_MUSIC_SUCCESS,
    data,
  };
}

export function loadKeywordMusicFailure(err) {
  return {
    type: LOAD_KEYWORD_MUSIC_FAILURE,
    err,
  };
}
