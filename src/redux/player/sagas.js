import { takeEvery, all, put, call, select } from 'redux-saga/effects';
import { getSoundCloudMusic } from 'src/api';

import * as palyerActions from './actions';

export function* playNextMusic(action) {
  yield put(palyerActions.playNextMusicRequest());

  const isShuffle = yield select(state => state.player.shuffle);
  const currentMusicInfoArray = yield select(state => state.music.playingMusic);
  const targetPlayList = yield select(state => state.playList.musicList);
  try {
    if (targetPlayList) {
      const currentMusicIndex = targetPlayList.indexOf(
        currentMusicInfoArray.musicId,
      );
      const nextMusicId = isShuffle
        ? targetPlayList[randomIndex(currentMusicIndex, targetPlayList.length)]
        : targetPlayList[(currentMusicIndex + 1) % targetPlayList.length];

      const data = yield call(getSoundCloudMusic, nextMusicId);

      yield put(palyerActions.playNextMusicSuccess(data));
    }
  } catch (err) {
    yield put(palyerActions.playNextMusicFailure(err));
  }
}

export function* playPrevMusic(action) {
  yield put(palyerActions.playPrevMusicRequest);

  const isShuffle = yield select(state => state.player.shuffle);
  const currentMusicInfoArray = yield select(state => state.music.playingMusic);
  const targetPlayList = yield select(state => state.playList.musicList);

  try {
    if (targetPlayList) {
      const currentMusicIndex = targetPlayList.indexOf(
        currentMusicInfoArray.musicId,
      );
      let nextMusicId = targetPlayList[0];
      if (currentMusicIndex !== -1)
        nextMusicId = isShuffle
          ? targetPlayList[
              randomIndex(currentMusicIndex, targetPlayList.length)
            ]
          : targetPlayList[(currentMusicIndex - 1) % targetPlayList.length];

      const data = yield call(getSoundCloudMusic, nextMusicId);
      yield put(palyerActions.playPrevMusicSuccess(data));
    }
  } catch (err) {
    yield put(palyerActions.playPrevMusicFailure(err));
  }
}

function randomIndex(currentIndex, maxIndex) {
  const nextIndex = Math.floor(Math.random() * (maxIndex - 1) + 0);
  if (currentIndex === nextIndex) {
    return randomIndex(currentIndex, maxIndex);
  }
  return nextIndex;
}

export function* watchPlayNextMusicFlow() {
  yield takeEvery(palyerActions.PLAY_NEXT_MUSIC, playNextMusic);
}

export function* watchPlayPrevMusicFlow() {
  yield takeEvery(palyerActions.PLAY_PREV_MUSIC, playPrevMusic);
}

export default function* playerRoot() {
  yield all([watchPlayNextMusicFlow(), watchPlayPrevMusicFlow()]);
}
