// EXplain : palylist reducer에서 정보를 받아와서 다음곡 재생하기.
const PREFIX = 'META';

export const ON_LOAD_START = `${PREFIX}/ON_LOAD_START`;
export const ON_LOADED_METADATA = `${PREFIX}/ON_LOADED_METADATA`;
export const ON_PAUSE = `${PREFIX}/ON_PAUSE`;
export const ON_PLAY = `${PREFIX}/ON_PLAY`;
export const ON_TIME_UPDATE = `${PREFIX}/ON_TIME_UPDATE`;
export const ON_VOLUME_CHANGE = `${PREFIX}/ON_VOLUME_CHANGE`;
export const PLAY_SONG = `${PREFIX}/PLAY_SONG`;
export const TOGGLE_SHUFFLE = `${PREFIX}/TOGGLE_SHUFFLE`;
export const CHANGE_MYPLAYER_CURRENT_TIME = `${PREFIX}/CHANGE_MYPLAYER_CURRENT_TIME`;
export const CHANGE_MYPLAYER_VOLUME = `${PREFIX}/CHANGE_MYPLAYER_VOLUME`;
export const PLAY_NEXT_SONG = `${PREFIX}/PLAY_NEXT_SONG`;
export const PLAY_NEXT_SONG_REQUEST = `${PREFIX}/PLAY_NEXT_SONG_REQUEST`;
export const PLAY_NEXT_SONG_SUCCESS = `${PREFIX}/PLAY_NEXT_SONG_SUCCESS`;
export const PLAY_NEXT_SONG_FAILURE = `${PREFIX}/PLAY_NEXT_SONG_FAILURE`;
export const PLAY_PREV_SONG = `${PREFIX}/PLAY_PREV_SONG`;
export const PLAY_PREV_SONG_REQUEST = `${PREFIX}/PLAY_PREV_SONG_REQUEST`;
export const PLAY_PREV_SONG_SUCCESS = `${PREFIX}/PLAY_PREV_SONG_SUCCESS`;
export const PLAY_PREV_SONG_FAILURE = `${PREFIX}/PLAY_PREV_SONG_FAILURE`;

export function onLoadedMetadata(duration) {
  return {
    type: ON_LOADED_METADATA,
    duration,
  };
}

export function onLoadStart() {
  return {
    type: ON_LOAD_START,
  };
}

export function onPause() {
  return {
    type: ON_PAUSE,
  };
}

export function onPlay() {
  return {
    type: ON_PLAY,
  };
}

export function onTimeUpdate(currentTime) {
  return {
    type: ON_TIME_UPDATE,
    currentTime,
  };
}

export function onVolumeChange(muted, volume) {
  return {
    type: ON_VOLUME_CHANGE,
    muted,
    volume,
  };
}

export function playSong(playlist, playingIndex) {
  return {
    type: PLAY_SONG,
    playlist,
    playingIndex,
  };
}

export function changeMyPlayerCurrentTime(myPlayerCurrentTime) {
  return {
    type: CHANGE_MYPLAYER_CURRENT_TIME,
    myPlayerCurrentTime,
  };
}

export function changeMyPlayerVolume(myPlayerVolume) {
  return {
    type: CHANGE_MYPLAYER_VOLUME,
    myPlayerVolume,
  };
}

export function toggleShuffle() {
  return {
    type: TOGGLE_SHUFFLE,
  };
}

export function playNextSong() {
  return {
    type: PLAY_NEXT_SONG,
  };
}

export function playNextSongRequest() {
  return {
    type: PLAY_NEXT_SONG_REQUEST,
  };
}

export function playNextSongSuccess(data) {
  return {
    type: PLAY_NEXT_SONG_SUCCESS,
    data,
  };
}

export function playNextSongFailure(err) {
  return {
    type: PLAY_NEXT_SONG_FAILURE,
    err,
  };
}

export function playPrevSong() {
  return {
    type: PLAY_PREV_SONG,
  };
}

export function playPrevSongRequest() {
  return {
    type: PLAY_PREV_SONG_REQUEST,
  };
}

export function playPrevSongSuccess(data) {
  return {
    type: PLAY_PREV_SONG_SUCCESS,
    data,
  };
}

export function playPrevSongFailure(err) {
  return {
    type: PLAY_PREV_SONG_FAILURE,
    err,
  };
}
