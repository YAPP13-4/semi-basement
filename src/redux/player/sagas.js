import { takeEvery, all, put, select } from 'redux-saga/effects';

import * as palyerActions from './actions';
import * as musicActions from 'src/redux/music/actions';

export function* playNextMusic() {
  yield put(palyerActions.playNextMusicRequest());

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
        : targetPlayList[(currentMusicIndex + 1) % targetPlayList.length];

      const { id, title, musician, artworkImg, streamUrl } = nextMusic;
      const duration = nextMusic.duration / 1000;

      yield put(
        musicActions.selectMusic({
          id,
          title,
          musician,
          artworkImg,
          streamUrl,
          duration,
        }),
      );
    }
  } catch (err) {
    yield put(palyerActions.playNextMusicFailure(err));
  }
}

export function* playPrevMusic() {
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

      const { id, title, musician, artworkImg, streamUrl } = nextMusic;
      const duration = nextMusic.duration / 1000;
      yield put(
        musicActions.selectMusic({
          id,
          title,
          musician,
          artworkImg,
          streamUrl,
          duration,
        }),
      );
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
