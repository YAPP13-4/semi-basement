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
  loadSongInfoFailure,
  HISTORY_SONG,
  historySongRequest,
  historySongSuccess,
  historySongFailure
} from "./actions"
export function* updateHistoryLocalStorage(action) {
  //FIXME : reaplace with selectSong action . song[0] === songId
  const { songId } = action
  console.log("action", action)
  const targetId = songId
  console.log("target id", targetId)
  yield put(historySongRequest())

  try {
    let newHistory = []
    if (checkValidValue(localStorage.historySong)) {
      const localData = JSON.parse(localStorage.historySong)
      let containsId = false

      const localDataLen = localData.length
      //let newHistory = []
      let index
      for (index = 0; index < localDataLen; index++) {
        if (targetId === localData[index]) {
          containsId = true
          break
        }
      }
      if (!checkValidValue(containsId)) {
        localData.push(targetId)
        localStorage.setItem("historySong", JSON.stringify(localData))
      }

      for (index = 0; index < localData.length; index++) {
        newHistory.push(localData[index])
      }
    } else {
      newHistory = [targetId]
      localStorage.historySong = JSON.stringify(newHistory)
    }
    const data = yield all(newHistory.map(id => call(getSoundCloudSong, id)))
    yield put(historySongSuccess(data))
  } catch (err) {
    console.log(err)
    yield put(historySongFailure(err))
  }
}
export function* watchHistorySongInfoFlow() {
  yield takeEvery(HISTORY_SONG, updateHistoryLocalStorage)
}

///////
export function* loadSongsInfoFrom(action) {
  console.log("load song info from ", action)
  const { songUrlArr } = action
  yield put(loadSongInfoRequest())
  try {
    //yield all(urls.map((url) => call(url)));
    const data = yield all(
      songUrlArr.map(url => call(getSoundCloudSongInfo, url))
    )
    yield put(loadSongInfoSuccess(data))
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
  yield all([
    watchLoadSongDtailFlow(),
    watchLoadSongInfoFlow(),
    watchHistorySongInfoFlow()
  ])
}

function checkValidValue(value) {
  if (value) return true
  else return false
}
