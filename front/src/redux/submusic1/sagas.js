import { takeEvery, all, put, call } from "redux-saga/effects"
import { getSoundCloudSongInfo } from "src/api"

import {
  LOAD_SONG_INFO,
  loadSongInfoRequest,
  loadSongInfoSuccess,
  loadSongInfoFailure
} from "./actions"

export function* loadSubSongsInfo(action) {
  console.log("load song info from ", action)
  const { songArr } = action
  yield put(loadSongInfoRequest())
  try {
    const data = yield all(songArr.map(url => call(getSoundCloudSongInfo, url)))
    yield put(loadSongInfoSuccess(data))
  } catch (err) {
    yield put(loadSongInfoFailure(err))
  }
}

export function* watchLoadSongInfoFlow() {
  yield takeEvery(LOAD_SONG_INFO, loadSubSongsInfo)
}

export default function* subMusicRoot() {
  yield all([watchLoadSongInfoFlow()])
}
