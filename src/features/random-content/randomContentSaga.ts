import {takeEvery, call, put, fork} from 'redux-saga/effects'
import {sagaActions} from "./sagaActions";
import {fetchRandomCatFact, fetchRandomActivity, fetchRandomDogImage} from "./randomContentAPI";
import {
  setDogImgName,
  setDogImgStatus,
  setDogImgError,

  setCatFactName,
  setCatFactStatus,
  setCatFactError,

  setActivityName,
  setActivityStatus,
  setActivityError,
} from './randomContentSlice';

export function* handleLoadDogImage() {
  yield put(setDogImgStatus({status: 'loading'}))
  try {
    const result: string = yield call(fetchRandomDogImage)
    yield put(setDogImgName({name: result}))
    yield put(setDogImgStatus({status: 'idle'}))
  } catch (e) {
    yield put(setDogImgError({error: 'error fetching dog image'}))
    yield put(setDogImgStatus({status: 'failed'}))
  }
}

export function* handleLoadCatFact() {
  yield put(setCatFactStatus({status: 'loading'}))
  try {
    const result: string = yield call(fetchRandomCatFact)
    yield put(setCatFactName({name: result}))
    yield put(setCatFactStatus({status: 'idle'}))
  } catch (e) {
    yield put(setCatFactError({error: 'error fetching cat fact'}))
    yield put(setCatFactStatus({status: 'failed'}))
  }
}

export function* handleLoadActivity() {
  yield put(setActivityStatus({status: 'loading'}))
  try {
    const result: string = yield call(fetchRandomActivity)
    yield put(setActivityName({name: result}))
    yield put(setActivityStatus({status: 'idle'}))
  } catch (e) {
    yield put(setActivityError({error: 'error fetching cat fact'}))
    yield put(setActivityStatus({status: 'failed'}))
  }
}

export function* handleLoadContent() {
  yield fork(handleLoadDogImage)
  yield fork(handleLoadCatFact)
  yield fork(handleLoadActivity)
}

export function* watchClickLoadRandomContentSaga() {
  yield takeEvery(sagaActions.LOAD_RANDOM_CONTENT, handleLoadContent);
}
