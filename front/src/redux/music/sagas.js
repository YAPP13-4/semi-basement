import { takeEvery, all, put, call } from "redux-saga/effects"
import { getSoundCloudSong, getSoundCloudSongInfo } from "src/api"
import {
  LOAD_SONG_DETAIL,
  loadSongDetailRequest,
  loadSongDetailSuccess,
  loadSongDetailFailure,
  LOAD_SONG_INFO,
  loadSongInfoRequest,
  loadSongInfoSuccess,
  loadSongInfoFailure
} from "./actions"

export function* loadSongsInfoFrom(action) {
  console.log("load song info from ", action)
  const { songUrl } = action
  yield put(loadSongInfoRequest())
  try {
    const { musicInfo } = yield call(getSoundCloudSongInfo, songUrl)
    console.log(musicInfo)
    yield put(loadSongInfoSuccess(musicInfo))
  } catch (err) {
    yield put(loadSongInfoFailure(err))
  }
}

export function* watchLoadSongInfoFlow() {
  yield takeEvery(LOAD_SONG_INFO, loadSongsInfoFrom)
}

export function* loadSongDetailFlow(action) {
  const { songId } = action
  yield put(loadSongDetailRequest())
  try {
    const { data } = yield call(getSoundCloudSong, songId)

    yield put(loadSongDetailSuccess(data))
  } catch (error) {
    yield put(loadSongDetailFailure(error))
  }
}

export function* watchLoadSongDtailFlow() {
  yield takeEvery(LOAD_SONG_DETAIL, loadSongDetailFlow)
}

export default function* musicRoot() {
  yield all([watchLoadSongDtailFlow(), watchLoadSongInfoFlow()])
}
