import {put, call, takeEvery, all} from 'redux-saga/effects';
import {getMusicInfo, postMusic} from 'src/api';
import {push} from 'react-router-redux';
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

export function* registSoundcloudMusicFlow({music}) {
  try {
    const {data: {id}} = yield call(postMusic, music)
    yield put(registerActions.registSoundcloudMusicSuccess());
    alert('track이 잘 등록 되었습니다 ;)');
    yield put(push(`/musicDetail/${id}`));
  } catch (err) {
    console.log(err.err)
    yield put(registerActions.registSoundcloudMusicFailure(err));
  }
};

export function* watchRegistSoundcloudMusicFlow() {
  yield takeEvery(
    registerActions.REGIST_SOUNDCLOUD_MUSIC,
    registSoundcloudMusicFlow
  )
};

export default function* registerRoot() {
  yield all([watchLoadSoundcloudMusicInfoFlow(), watchRegistSoundcloudMusicFlow()]);
}