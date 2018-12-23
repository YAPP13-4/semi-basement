import { takeEvery, all, put, call } from 'redux-saga/effects';
import { getSoundCloudMusicInfo } from 'src/api';

import {
  LOAD_CHART_MUSIC_INFO,
  loadChartMusicInfoRequest,
  loadChartMusicInfoSuccess,
  loadChartMusicInfoFailure,
} from './actions';

export function* loadChartMusicDetailFlow(action) {
  const { musicUrlArr } = action;
  yield put(loadChartMusicInfoRequest());
  try {
    const data = yield all(
      musicUrlArr.map(url => call(getSoundCloudMusicInfo, url)),
    );
    yield put(loadChartMusicInfoSuccess(data));
  } catch (err) {
    yield put(loadChartMusicInfoFailure(err));
  }
}

export function* watchLoadChartMusicInfoFlow() {
  yield takeEvery(LOAD_CHART_MUSIC_INFO, loadChartMusicDetailFlow);
}

export default function* chartMusicRoot() {
  yield all([watchLoadChartMusicInfoFlow()]);
}
