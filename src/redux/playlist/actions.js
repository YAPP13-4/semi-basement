const PREFIX = 'PLAYLIST';

export const LOAD_NEW_LIST = `${PREFIX}/LOAD_NEW_LIST`;

export function changePlayList(playlist, currentList) {
  return {
    type: LOAD_NEW_LIST,
    playlist,
    currentList,
  };
}

export const SELECT_PLAY_LIST = `${PREFIX}/SELECT_PLAY_LIST`;
export const SELECT_PLAY_LIST_REQUEST = `${PREFIX}/SELECT_PLAY_LIST_REQUEST`;
export const SELECT_PLAY_LIST_SUCCESS = `${PREFIX}/SELECT_PLAY_LIST_SUCCESS`;
export const SELECT_PLAY_LIST_FAILURE = `${PREFIX}/SELECT_PLAY_LIST_FAILURE`;

export function selectPlaylist(apiPath) {
  return {
    type: SELECT_PLAY_LIST,
    apiPath,
  };
}
