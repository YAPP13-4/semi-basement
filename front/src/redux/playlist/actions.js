const PREFIX = 'PLAYLIST';

export const LOAD_NEW_LIST = `${PREFIX}/LOAD_NEW_LIST`;

export function changePlayList(playlist, currentList) {
  return {
    type: LOAD_NEW_LIST,
    playlist,
    currentList,
  };
}
