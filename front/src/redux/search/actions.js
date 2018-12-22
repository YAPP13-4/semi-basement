const PREFIX = 'SEARCH';

export const SEARCH_SONG_INFO_REQUEST = `${PREFIX}/LOAD_SONG_INFO_REQUEST`;

export function searchMusicRequest(searchKeyWord) {
  return {
    type: SEARCH_SONG_INFO_REQUEST,
    searchKeyWord,
  };
}
