import { takeEvery, all, put } from 'redux-saga/effects'
import {
  LOAD_SONG_DETAIL,
  loadSongDetailRequest,
  loadSongDetailSuccess,
  loadSongDetailFailure
} from './actions'

export function* loadSongDetailFlow() {
  yield put(loadSongDetailRequest())
  try {

    // const data = api call

    // yield put(loadSongDetailSuccess(data))
  } catch (error) {
    yield put(loadSongDetailFailure(error))
  }
}

export function* watchLoadSongDtailFlow() {
  yield takeEvery(LOAD_SONG_DETAIL, loadSongDetailFlow)
}

export default function* musicRoot() {
  yield all([watchLoadSongDtailFlow()])
}
