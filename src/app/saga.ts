import {watchClickUpdateTasksSaga} from "../features/planner/plannerSaga";
import {watchClickLoadRandomContentSaga} from "../features/random-content/randomContentSaga";
import {all} from "axios";

export default function* rootSaga() {
  console.log('root saga')
  yield all([
    watchClickUpdateTasksSaga(),
    watchClickLoadRandomContentSaga()
  ]);
}
