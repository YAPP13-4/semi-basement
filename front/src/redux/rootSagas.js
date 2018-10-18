import { all } from "redux-saga/effects"

import musicRoot from "./music/sagas"

export default function* root() {
  yield all([musicRoot()])
}
