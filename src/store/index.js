import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import taskReducer from './taskSlice';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    taskStore: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
