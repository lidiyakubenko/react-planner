import {takeEvery, call, put} from 'redux-saga/effects'
import {sagaActions} from './sagaActions'
import {fetchTaskList} from "./plannerAPI";
import { setTasks, setStatus, setError } from './plannerSlice';

export function* workerSaga() {
  yield put(setStatus('loading'))
  try {
    // @ts-ignore
    const result = yield call(fetchTaskList)
    yield put(setTasks(result.data))
    yield put(setStatus('idle'))
  } catch (error) {
    yield put(setStatus('failed'))
    // yield put(setError(error.message))
  }
}

export function* watchClickUpdateTasksSaga() {
  yield takeEvery(sagaActions.ADD_TASK, workerSaga);
}
