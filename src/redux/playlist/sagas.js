import { takeEvery, put, all, call } from 'redux-saga/effects';
import { getPlaylist } from 'src/api';
import * as playlistActions from './actions';

export function* selectPlaylistFlow({ apiPath }) {
  yield put(playlistActions.selectPlaylistRequest());

  try {
    const data = yield call(getPlaylist, apiPath);
    yield put(playlistActions.selectPlaylistSuccess(data));
  } catch (err) {
    yield put(playlistActions.selectPlaylistFailure(err));
  }
}

export function* watchSelectPlaylistFlow() {
  yield takeEvery(playlistActions.SELECT_PLAY_LIST, selectPlaylistFlow);
}

export default function* playlistRoot() {
  yield all([watchSelectPlaylistFlow()]);
}
