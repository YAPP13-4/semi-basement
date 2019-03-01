import { takeEvery, all, put, call } from 'redux-saga/effects';
import { getSoundCloudMusicInfo } from 'src/api';

import {
  LOAD_MUSIC_INFO,
  loadMusicInfoRequest,
  loadMusicInfoSuccess,
  loadMusicInfoFailure,
} from './actions';

export function* loadSubMusicInfo(action) {
  yield put(loadMusicInfoRequest());
  try {
    const data = yield call(getSoundCloudMusicInfo);
    yield put(loadMusicInfoSuccess(data));
  } catch (err) {
    yield put(loadMusicInfoFailure(err));
  }
}

export function* watchLoadMusicInfoFlow() {
  yield takeEvery(LOAD_MUSIC_INFO, loadSubMusicInfo);
}

export default function* subMusicRoot() {
  yield all([watchLoadMusicInfoFlow()]);
}
