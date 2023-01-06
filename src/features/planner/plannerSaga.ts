import {takeEvery, call, put} from 'redux-saga/effects'
import {sagaActions} from './sagaActions'
import {fetchTaskList} from "./plannerAPI";
import {setTasks, setStatus, Task} from './plannerSlice';

export function* workerSaga() {
  yield put(setStatus('loading'))
  try {
    const result: {data: Task[]} = yield call(fetchTaskList)
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
