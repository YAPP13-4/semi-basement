export const SEARCH_SONG_INFO_REQUEST = "LOAD_SONG_INFO_REQUEST"

export function searchMusicRequest(searchKeyWord) {
  return {
    type: SEARCH_SONG_INFO_REQUEST,
    searchKeyWord
  }
}
