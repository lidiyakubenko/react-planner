import {watchClickUpdateTasksSaga} from "../features/planner/plannerSaga";
import {watchClickLoadRandomContentSaga} from "../features/random-content/randomContentSaga";

export default function* rootSaga() {
  console.log('root saga')
  // yield watchClickUpdateTasksSaga()
  yield watchClickLoadRandomContentSaga()
}
