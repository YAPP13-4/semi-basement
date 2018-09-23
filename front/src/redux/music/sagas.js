import { takeEvery, all, put } from 'redux-saga/effects'
import {
  LOAD_SONG_DETAIL,
  loadSongDetailRequest,
  // loadSongDetailSuccess,
  // loadSongDetailFailure
} from './actions'

export function* loadSongDetailFlow() {
  yield put(loadSongDetailRequest())
  debugger;
}

export function* watchLoadSongDtailFlow() {
  yield takeEvery(LOAD_SONG_DETAIL, loadSongDetailFlow)
}

export default function* musicRoot() {
  yield all([watchLoadSongDtailFlow()])
}
