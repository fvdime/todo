import { put, takeLatest, fork } from "redux-saga/effects";
import {
  addTask,
  setAddTask,
  deleteTask,
  setDeleteTask,
  editTask,
  setEditTask,
  clearAll,
  setClearAll,
  getTasks,
  setTasks,
  checkedTodo,
  setCheckedTodo,
} from "../store/taskSlice";

function* onAddTaskAsync(action) {
  yield put(setAddTask(action.payload));
}

function* onEditTaskAsync(action) {
  yield put(setEditTask(action.payload));
}

function* onGetTasksAsync() {
  yield put(setTasks());
}

function* onDeleteTaskAsync(action) {
  yield put(setDeleteTask(action.payload));
}

function* onCheckedTodoAsync(action) {
  yield put(setCheckedTodo(action.payload));
}

function* onClearAllAsync() {
  yield put(setClearAll());
}

function* watchAddTask() {
  yield takeLatest(addTask.type, onAddTaskAsync);
}

function* watchEditTask() {
  yield takeLatest(editTask.type, onEditTaskAsync);
}

function* watchGetTasks() {
  yield takeLatest(getTasks.type, onGetTasksAsync);
}

function* watchDeleteTask() {
  yield takeLatest(deleteTask.type, onDeleteTaskAsync);
}

function* watchClearAll() {
  yield takeLatest(clearAll.type, onClearAllAsync);
}

function* watchCheckedTodo() {
  yield takeLatest(checkedTodo.type, onCheckedTodoAsync);
}

export const taskSagas = [
  fork(watchAddTask),
  fork(watchEditTask),
  fork(watchGetTasks),
  fork(watchDeleteTask),
  fork(watchClearAll),
  fork(watchCheckedTodo),
];
