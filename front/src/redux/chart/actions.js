export const NAME = "CHART"
export const LOAD_CHART_SONG_INFO = `${NAME}/LOAD_CHART_SONG_INFO`
export const LOAD_CHART_SONG_INFO_REQUEST = `${NAME}/LOAD_CHART_SONG_REQUEST`
export const LOAD_CHART_SONG_INFO_SUCCESS = `${NAME}/LOAD_CHART_SONG_SUCCESS`
export const LOAD_CHART_SONG_INFO_FAILURE = `${NAME}/LOAD_CHART_SONG_FAILURE`

//new action
export function loadChartSongsInfo(songUrlArr) {
  return {
    type: LOAD_CHART_SONG_INFO,
    songUrlArr
  }
}

export function loadChartSongInfoRequest() {
  return {
    type: LOAD_CHART_SONG_INFO_REQUEST
  }
}

export function loadChartSongInfoSuccess(data) {
  return {
    type: LOAD_CHART_SONG_INFO_SUCCESS,
    data
  }
}

export function loadChartSongInfoFailure(err) {
  return {
    type: LOAD_CHART_SONG_INFO_FAILURE,
    err
  }
}
