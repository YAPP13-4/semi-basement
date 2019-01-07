import { takeEvery, all, put, call, select } from 'redux-saga/effects';
import { getSoundCloudMusic } from 'src/api';

import * as palyerActions from './actions';

export function* playNextMusic(action) {
  yield put(palyerActions.playNextMusicRequest());

  const isShuffle = yield select(state => state.player.shuffle);
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

    // 현재 재생중인 곡의 id를 통해, 현재 재생목록에서의 위치를 찾고, 그 다음곡을 select 해준다.
    console.log(currentMusic.id);
    console.log(targetPlayList);
    console.log(
      targetPlayList.filter((music, index) => {
        console.log(index);
        return music.id === currentMusic.id;
      }),
    );
    debugger;
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
