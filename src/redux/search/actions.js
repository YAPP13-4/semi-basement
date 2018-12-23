const PREFIX = "SEARCH"

export const SEARCH_MUSIC_INFO_REQUEST = `${PREFIX}/LOAD_MUSIC_INFO_REQUEST`

export function searchMusicRequest(searchKeyWord) {
  return {
    type: SEARCH_MUSIC_INFO_REQUEST,
    searchKeyWord
  }
}
