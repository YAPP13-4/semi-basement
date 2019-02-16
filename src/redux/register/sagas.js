import {put, call, takeEvery, all} from 'redux-saga/effects';
import {getMusicInfo} from 'src/api';
import * as registerActions from './actions';

export function* loadSoundcloudMusicInfoFlow({url}) {
  try {
    const data = yield call(getMusicInfo, url);
    yield put(registerActions.loadSoundcloudMusicInfoSuccess(data));
  } catch (err) {
    yield put(registerActions.loadSoundcloudMusicInfoFailure(err));
  }
};

export function* watchLoadSoundcloudMusicInfoFlow() {
  yield takeEvery(
    registerActions.LOAD_SOUNDCLOUD_MUSIC_INFO,
    loadSoundcloudMusicInfoFlow
  )
};

export default function* registerRoot() {
  yield all([watchLoadSoundcloudMusicInfoFlow()]);
}