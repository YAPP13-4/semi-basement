import { takeEvery, all, put, call, select } from 'redux-saga/effects';
import { getMusicDetail } from 'src/api';
import * as musicActions from '../music/actions';
import * as palyerActions from './actions';

export function* playNextMusic(action) {
  yield put(palyerActions.playNextMusicRequest());

  const isShuffle = yield select(state => state.player.shuffle);
  const currentMusicInfo = yield select(state => state.music.playingMusicInfo);
  const targetPlayList = yield select(state => state.playList.musicList);
  console.log('targetPlayList', targetPlayList);
  if (!targetPlayList) return;

  try {
    console.log('targetPlayLisdfsdfdfdsft', targetPlayList, currentMusicInfo);
    if (targetPlayList) {
      const currentMusicIndex = targetPlayList.findIndex(
        music => music.id === currentMusicInfo.id,
      );
      console.log('currentMusicIndex', currentMusicIndex);
      const nextMusic = isShuffle
        ? targetPlayList[randomIndex(currentMusicIndex, targetPlayList.length)]
        : targetPlayList[(currentMusicIndex + 1) % targetPlayList.length];
      console.log('nextMusic', nextMusic);
      yield put(musicActions.selectMusic(nextMusic));
    }
  } catch (err) {
    yield put(palyerActions.playNextMusicFailure(err));
  }
}

export function* playPrevMusic(action) {
  yield put(palyerActions.playPrevMusicRequest);

  const isShuffle = yield select(state => state.player.shuffle);
  const currentMusicInfo = yield select(state => state.music.playingMusicInfo);
  const targetPlayList = yield select(state => state.playList.musicList);

  if (!targetPlayList) return;

  try {
    if (targetPlayList) {
      const currentMusicIndex = targetPlayList.findIndex(
        music => music.id === currentMusicInfo.id,
      );

      const nextMusic = isShuffle
        ? targetPlayList[randomIndex(currentMusicIndex, targetPlayList.length)]
        : targetPlayList[(currentMusicIndex - 1) % targetPlayList.length];
      yield put(musicActions.selectMusic(nextMusic));
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
