const PREFIX = 'CHART';

export const LOAD_CHART_MUSIC_INFO = `${PREFIX}/LOAD_CHART_MUSIC_INFO`;
export const LOAD_CHART_MUSIC_INFO_REQUEST = `${PREFIX}/LOAD_CHART_MUSIC_REQUEST`;
export const LOAD_CHART_MUSIC_INFO_SUCCESS = `${PREFIX}/LOAD_CHART_MUSIC_SUCCESS`;
export const LOAD_CHART_MUSIC_INFO_FAILURE = `${PREFIX}/LOAD_CHART_MUSIC_FAILURE`;

export function loadChartMusicsInfo(musicUrlArr) {
  return {
    type: LOAD_CHART_MUSIC_INFO,
    musicUrlArr,
  };
}

export function loadChartMusicInfoRequest() {
  return {
    type: LOAD_CHART_MUSIC_INFO_REQUEST,
  };
}

export function loadChartMusicInfoSuccess(data) {
  return {
    type: LOAD_CHART_MUSIC_INFO_SUCCESS,
    data,
  };
}

export function loadChartMusicInfoFailure(err) {
  return {
    type: LOAD_CHART_MUSIC_INFO_FAILURE,
    err,
  };
}
