import {takeEvery, all, put, call, select} from 'redux-saga/effects';
import {getSoundCloudMusic} from 'src/api';

import * as palyerActions from './actions';
import * as musicActions from 'src/redux/music/actions'

export function* playNextMusic(action) {
  yield put(palyerActions.playNextMusicRequest());

  // const isShuffle = yield select(state => state.player.shuffle);
  const currentMusic = yield select(state => state.music.playingMusic);
  const targetPlayList = yield select(state => state.playList.musicList);

  try {
    // 나중에 shuffle 기능 리팩토링때 참고하기 위해 남겨놓음
    // if (targetPlayList) {
    //   const currentMusicIndex = targetPlayList.indexOf(currentMusicInfo.id);
    //   const nextMusicId = isShuffle
    //     ? targetPlayList[randomIndex(currentMusicIndex, targetPlayList.length)]
    //     : targetPlayList[(currentMusicIndex + 1) % targetPlayList.length];

    //   const data = yield call(getSoundCloudMusic, nextMusicId);
    //   yield put(palyerActions.playNextMusicSuccess(data));
    // }

    // -1 반환시에 예외처리하기 (플레이리스트에 현재 재생곡이 없을때..?)
    const currentMusicIdx = targetPlayList.findIndex(music => music.id === currentMusic.id)
    const {id, title, musician, artworkImg, streamUrl, duration} = targetPlayList[currentMusicIdx + 1];
    yield put(musicActions.selectMusic({id, title, musician, artworkImg, streamUrl, duration}));
    yield put(palyerActions.playNextMusicSuccess())
  } catch (err) {
    yield put(palyerActions.playNextMusicFailure(err));
  }
}

export function* playPrevMusic(action) {
  yield put(palyerActions.playPrevMusicRequest);

  const isShuffle = yield select(state => state.player.shuffle);
  const currentMusicInfo = yield select(state => state.music.playingMusic);
  const targetPlayList = yield select(state => state.playList.musicList);

  try {
    if (targetPlayList) {
      const currentMusicIndex = targetPlayList.indexOf(currentMusicInfo.id);
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
