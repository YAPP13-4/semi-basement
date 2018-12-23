import {
  takeEvery,
  takeLatest,
  all,
  put,
  call,
  select,
} from 'redux-saga/effects';
import {
  getSoundCloudMusic,
  getSoundCloudMusicInfo,
  getKeywordSearchResult,
} from 'src/api';

import * as musicActions from './actions';
import * as playerActions from 'src/redux/player/actions';

export function* updateHistoryLocalStorage(action) {
  const { musicId } = action;
  yield put(musicActions.historyMusicRequest());

  try {
    let newHistory = [];
    const historyMusic = localStorage.historyMusic;
    if (checkValidValue(historyMusic)) {
      let localData = JSON.parse(historyMusic);
      let containsId = false;
      const localDataLen = localData.length;
      let index;
      for (index = 0; index < localDataLen; index++) {
        if (musicId === localData[index]) {
          containsId = true;
          break;
        }
      }
      if (!checkValidValue(containsId)) {
        localData.push(musicId);
        localStorage.setItem('historyMusic', JSON.stringify(localData));
      }
      for (index = 0; index < localData.length; index++) {
        if (localData[index]) newHistory.push(localData[index]);
      }
    } else {
      newHistory = [musicId];
      localStorage.historyMusic = JSON.stringify(newHistory);
    }

    const data = yield all(newHistory.map(id => call(getSoundCloudMusic, id)));
    yield put(musicActions.historyMusicSuccess(data));
  } catch (err) {
    yield put(musicActions.historyMusicFailure(err));
  }
}
export function* watchHistoryMusicInfoFlow() {
  yield takeEvery(musicActions.HISTORY_MUSIC, updateHistoryLocalStorage);
}

export function* loadMusicsInfoFrom(action) {
  const { musicUrlArr } = action;
  yield put(musicActions.loadMusicInfoRequest());
  try {
    //yield all(urls.map((url) => call(url)));
    const data = yield all(
      musicUrlArr.map(url => call(getSoundCloudMusicInfo, url)),
    );
    yield put(musicActions.loadMusicInfoSuccess(data));
  } catch (err) {
    yield put(musicActions.loadMusicInfoFailure(err));
  }
}

export function* watchLoadMusicInfoFlow() {
  yield takeEvery(musicActions.LOAD_MUSIC_INFO, loadMusicsInfoFrom);
}

export function* loadMusicDetailFlow(action) {
  const { musicId } = action;

  yield put(musicActions.loadMusicDetailRequest());
  try {
    const data = yield call(getSoundCloudMusic, musicId);
    yield put(musicActions.loadMusicDetailSuccess(data));
  } catch (error) {
    yield put(musicActions.loadMusicDetailFailure(error));
  }
}

export function* watchLoadMusicDetailFlow() {
  yield takeEvery(musicActions.LOAD_MUSIC_DETAIL, loadMusicDetailFlow);
}

export function* loadKeywordMusicFlow(action) {
  const { keyword } = action;
  //FIXME : show issue #109 comment !!!!! 일시적 처리임.
  const getMusicInfo = state => state.music.musicInfo;
  const musicInfo = yield select(getMusicInfo);
  yield put(musicActions.loadKeywordMusicRequest());
  try {
    // 이 call 이 .... 내가 아는 call 이라면 apply로 처리해야 함.
    //2018.11.20 여기고치면 됨.
    const data = yield call(getKeywordSearchResult, { musicInfo, keyword });
    yield put(musicActions.loadKeywordMusicSuccess(data));
  } catch (error) {
    yield put(musicActions.loadKeywordMusicFailure(error));
  }
}

export function* watchLoadKeywordMusicFlow() {
  yield takeEvery(musicActions.LOAD_KEYWORD_MUSIC, loadKeywordMusicFlow);
}

export function* selectMusicFlow() {
  const musicInfo = yield select(state => state.player.musicInfo);
  yield put(
    musicActions.selectMusic({
      id: musicInfo.id,
      title: musicInfo.title,
      musician: musicInfo.user.username,
      artworkUrl: musicInfo.artwork_url,
      duration: musicInfo.duration / 1000,
    }),
  );
}

export function* watchSelectMusicFlow() {
  yield takeLatest(
    [
      playerActions.PLAY_NEXT_MUSIC_SUCCESS,
      playerActions.PLAY_PREV_MUSIC_SUCCESS,
    ],
    selectMusicFlow,
  );
}

export default function* musicRoot() {
  yield all([
    watchLoadMusicDetailFlow(),
    watchLoadMusicInfoFlow(),
    watchHistoryMusicInfoFlow(),
    watchLoadKeywordMusicFlow(),
    watchSelectMusicFlow(),
  ]);
}

function checkValidValue(value) {
  if (value) return true;
  else return false;
}
