import * as types from "./ActionType";
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
