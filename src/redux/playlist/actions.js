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

export function selectPlaylistRequest() {
  return {
    type: SELECT_PLAY_LIST_REQUEST,
    loading: true,
  };
}

export function selectPlaylistSuccess(data) {
  return {
    type: SELECT_PLAY_LIST_SUCCESS,
    loading: false,
    data,
  };
}

export function selectPlaylistFailure(err) {
  return {
    type: SELECT_PLAY_LIST_FAILURE,
    loading: false,
    err,
  };
}
