import { put, call, takeEvery, all } from 'redux-saga/effects';
import { fetchUser } from '../../service/user';
import * as userActions from './action';

export function* fetchUserData(action) {
  try {
    const userData = yield call(fetchUser);
    yield put(userActions.fetchUserSuccess(userData));
  } catch (error) {}
}

export function* watchUserInfoFlow() {
  yield takeEvery(userActions.USER_REQUEST, fetchUserData);
}

export default function* userRoot() {
  yield all([watchUserInfoFlow()]);
}
