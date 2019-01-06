import { takeEvery, put, all, call, select } from 'redux-saga/effects';
import { getPlaylist } from 'src/api';
import * as playlistActions from './actions';
import * as musicActions from '../music/actions';

export function* selectPlaylistFlow({ apiPath }) {
  yield put(playlistActions.selectPlaylistRequest());

  try {
    const data = yield call(getPlaylist, apiPath);
    yield put(playlistActions.selectPlaylistSuccess(data));

    const [firstMusic] = yield select(state => state.playList.musicList);
    let { title, musician, artworkImg, streamUrl, duration } = firstMusic;
    duration = duration / 1000; // backend에서 duration을 1000나눈 값으로 넘겨주어야 한다.(참고: https://github.com/YAPP13-4/seba-api-v1/issues/17)
    yield put(
      musicActions.selectMusic({
        title,
        musician,
        artworkImg,
        streamUrl,
        duration,
      }),
    );
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
