import { takeEvery, all, put, call } from 'redux-saga/effects';
import { getSoundCloudSongInfo } from 'src/api';

import {
  LOAD_CHART_SONG_INFO,
  loadChartSongInfoRequest,
  loadChartSongInfoSuccess,
  loadChartSongInfoFailure,
} from './actions';

export function* loadChartSongDetailFlow(action) {
  const { songUrlArr } = action;
  yield put(loadChartSongInfoRequest());
  try {
    const data = yield all(
      songUrlArr.map(url => call(getSoundCloudSongInfo, url)),
    );
    yield put(loadChartSongInfoSuccess(data));
  } catch (err) {
    yield put(loadChartSongInfoFailure(err));
  }
}

export function* watchLoadChartSongInfoFlow() {
  yield takeEvery(LOAD_CHART_SONG_INFO, loadChartSongDetailFlow);
}

export default function* chartMusicRoot() {
  yield all([watchLoadChartSongInfoFlow()]);
}
