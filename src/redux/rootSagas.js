import { all } from 'redux-saga/effects';

import musicRoot from './music/sagas';
import playerRoot from './player/sagas';
import chartMusicRoot from './chart/sagas';
import unsplashRoot from './unsplash/sagas';

export default function* root() {
  yield all([musicRoot(), playerRoot(), chartMusicRoot(), unsplashRoot()]);
}
