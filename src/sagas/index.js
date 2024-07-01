import { all } from "redux-saga/effects";
import { taskSagas } from "./task-saga";

export default function* rootSaga() {
  yield all([...taskSagas]);
}
