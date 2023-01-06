import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../app/saga'

// slices
import todoReducer from '../features/todo/todoSlice'
import plannerReducer from '../features/planner/plannerSlice'
import randomContentReducer from '../features/random-content/randomContentSlice'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    planner: plannerReducer,
    randomContent: randomContentReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
