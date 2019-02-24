import { takeEvery, all, put, call } from 'redux-saga/effects';
import { getUnsplashPhoto } from 'src/api';
import * as Actions from './actions';

export function* loadUnsplashImageInfo(action) {
  const { reqInfo } = action;
  try {
    const data = yield call(getUnsplashPhoto, reqInfo);
    yield put(Actions.unsplashImageSuccess(data));
  } catch (err) {
    yield put(Actions.unsplashImageFail(err));
  }
}

export function* watchUnsplashAction() {
  yield takeEvery(Actions.REQUEST, loadUnsplashImageInfo);
}

export default function* unsplashRoot() {
  yield all([watchUnsplashAction()]);
}
