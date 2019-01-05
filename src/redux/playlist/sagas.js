import { takeEvery, put, all } from 'redux-saga/effects';

import * as playlistActions from './actions';

export function* selectPlaylistFlow({ apiPath }) {
  yield put(playlistActions.selectPlaylistRequest());

  try {
    yield put(playlistActions.selectPlaylistSuccess());
  } catch (err) {
    yield put(playlistActions.selectPlaylistFailure());
  }
}

export function* watchSelectPlaylistFlow() {
  yield takeEvery(playlistActions.SELECT_PLAY_LIST, selectPlaylistFlow);
}

export default function* playlistRoot() {
  yield all([watchSelectPlaylistFlow()]);
}
