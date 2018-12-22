const PREFIX = 'MUSIC';

export const SELECT_SONG = `${PREFIX}/SELECT_SONG`;
export const HISTORY_SONG = `${PREFIX}/HISTORY_SONG`;
export const HISTORY_SONG_REQUEST = `${PREFIX}/HISTORY_SONG_REQUEST`;
export const HISTORY_SONG_SUCCESS = `${PREFIX}/HISTORY_SONG_SUCCESS`;
export const HISTORY_SONG_FAILURE = `${PREFIX}/HISTORY_SONG_FAILURE`;
export const FETCH_NEW_STREAM_SONGS_SUCCESS = `${PREFIX}/FETCH_NEW_STREAM_SONGS_SUCCESS`;
export const FETCH_SONGS_REQUEST = `${PREFIX}/FETCH_SONGS_REQUEST`;
export const FETCH_SONGS_SUCCESS = `${PREFIX}/FETCH_SONGS_SUCCESS`;
export const LOAD_SONG_INFO = `${PREFIX}/LOAD_SONG_INFO`;
export const LOAD_SONG_INFO_REQUEST = `${PREFIX}/LOAD_SONG_INFO_REQUEST`;
export const LOAD_SONG_INFO_SUCCESS = `${PREFIX}/LOAD_SONG_INFO_SUCCESS`;
export const LOAD_SONG_INFO_FAILURE = `${PREFIX}/LOAD_SONG_INFO_FAILURE`;
export const LOAD_SONG_DETAIL = `${PREFIX}//LOAD_SONG_DETAIL`;
export const LOAD_SONG_DETAIL_REQUEST = `${PREFIX}/LOAD_SONG_DETAIL_REQUEST`;
export const LOAD_SONG_DETAIL_SUCCESS = `${PREFIX}/LOAD_SONG_DETAIL_SUCCESS`;
export const LOAD_SONG_DETAIL_FAILURE = `${PREFIX}/LOAD_SONG_DETAIL_FAILURE`;
export const LOAD_KEYWORD_MUSIC = `${PREFIX}/LOAD_KEYWORD_MUSIC`;
export const LOAD_KEYWORD_MUSIC_REQUEST = `${PREFIX}/LOAD_KEYWORD_MUSIC_REQUEST`;
export const LOAD_KEYWORD_MUSIC_SUCCESS = `${PREFIX}/LOAD_KEYWORD_MUSIC_SUCCESS`;
export const LOAD_KEYWORD_MUSIC_FAILURE = `${PREFIX}/LOAD_KEYWORD_MUSIC_FAILURE`;

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
