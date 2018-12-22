import { takeEvery, all, put, fork, call, select } from 'redux-saga/effects';
import { getSoundCloudSong } from 'src/api';

import {
  PLAY_NEXT_SONG,
  playNextSongRequest,
  playNextSongSuccess,
  playNextSongFailure,
  PLAY_PREV_SONG,
  playPrevSongRequest,
  playPrevSongFailure,
  playPrevSongSuccess,
  PLAY_NEXT_SONG_SUCCESS,
  PLAY_PREV_SONG_SUCCESS,
} from './actions';

import { selectSong } from 'src/redux/music/actions';

export function* playNextSong(action) {
  yield put(playNextSongRequest());

  const isShuffle = yield select(state => state.player.shuffle);
  const currentSongInfoArray = yield select(state => state.music.playingMusic);
  const targetPlayList = yield select(state => state.playList.musicList);
  try {
    if (targetPlayList) {
      const currentSongIndex = targetPlayList.indexOf(
        currentSongInfoArray.songId,
      );
      const nextSongId = isShuffle
        ? targetPlayList[randomIndex(currentSongIndex, targetPlayList.length)]
        : targetPlayList[(currentSongIndex + 1) % targetPlayList.length];

      const data = yield call(getSoundCloudSong, nextSongId);

      yield put(playNextSongSuccess(data));
    }
  } catch (err) {
    yield put(playNextSongFailure(err));
  }
}

export function* playPrevSong(action) {
  yield put(playPrevSongRequest);

  const isShuffle = yield select(state => state.player.shuffle);
  const currentSongInfoArray = yield select(state => state.music.playingMusic);
  const targetPlayList = yield select(state => state.playList.musicList);

  try {
    if (targetPlayList) {
      const currentSongIndex = targetPlayList.indexOf(
        currentSongInfoArray.songId,
      );
      let nextSongId = targetPlayList[0];
      if (currentSongIndex !== -1)
        nextSongId = isShuffle
          ? targetPlayList[randomIndex(currentSongIndex, targetPlayList.length)]
          : targetPlayList[(currentSongIndex - 1) % targetPlayList.length];

      const data = yield call(getSoundCloudSong, nextSongId);
      yield put(playPrevSongSuccess(data));
    }
  } catch (err) {
    yield put(playPrevSongFailure(err));
  }
}

function randomIndex(currentIndex, maxIndex) {
  const nextIndex = Math.floor(Math.random() * (maxIndex - 1) + 0);
  if (currentIndex === nextIndex) {
    return randomIndex(currentIndex, maxIndex);
  }
  return nextIndex;
}

export function* watchPlayNextSongFlow() {
  yield takeEvery(PLAY_NEXT_SONG, playNextSong);
}

export function* watchPlayPreSongFlow() {
  yield takeEvery(PLAY_PREV_SONG, playPrevSong);
}

export default function* playerRoot() {
  yield all([watchPlayNextSongFlow(), watchPlayPreSongFlow()]);
}
