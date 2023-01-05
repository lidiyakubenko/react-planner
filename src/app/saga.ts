import {watchClickUpdateTasksSaga} from "../features/planner/plannerSaga";

export default function* rootSaga() {
  console.log('root saga')
  yield watchClickUpdateTasksSaga()
}
