import { takeEvery, all, put, call, select } from 'redux-saga/effects';
import {
  getCurationMusicList,
  getMusicDetail,
  getKeywordSearchResult,
} from 'src/api';
import * as playerActions from '../player/actions';
import * as musicActions from './actions';

export function* updateHistoryLocalStorage(action) {
  const { playingMusicInfo } = action;
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
        if (playingMusicInfo.id === localData[index].id) {
          containsId = true;
          break;
        }
      }
      if (!containsId) {
        localData.push(playingMusicInfo);
      }
      newHistory = localData;
      localStorage.setItem('historyMusic', JSON.stringify(localData));
    } else {
      newHistory = [playingMusicInfo];

      localStorage.historyMusic = JSON.stringify(newHistory);
    }

    yield put(musicActions.historyMusicSuccess(newHistory));
  } catch (err) {
    yield put(musicActions.historyMusicFailure(err));
  }
}
export function* watchHistoryMusicInfoFlow() {
  yield takeEvery(musicActions.SELECT_MUSIC, updateHistoryLocalStorage);
}

export function* loadMusicsInfoFrom(action) {
  const { musicListName } = action;
  yield put(musicActions.loadMusicInfoRequest());
  try {
    const data = yield call(getCurationMusicList, musicListName);
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
    const data = yield call(getMusicDetail, musicId);
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
  const getMusicInfo = state => state.music.musicInfo;
  const musicInfo = yield select(getMusicInfo);
  yield put(musicActions.loadKeywordMusicRequest());
  try {
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
  yield takeEvery(
    [
      playerActions.PLAY_NEXT_MUSIC_SUCCESS,
      playerActions.PLAY_PREV_MUSIC_SUCCESS,
    ],
    selectMusicFlow,
  );
}

export default function* musicRoot() {
  yield all([
    watchLoadMusicInfoFlow(),
    watchLoadMusicDetailFlow(),
    watchHistoryMusicInfoFlow(),
    watchLoadKeywordMusicFlow(),
  ]);
}

function checkValidValue(value) {
  if (value) return true;
  else return false;
}
