import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {status} from '../../app/types'
// import {fetchTaskList} from "./plannerAPI";

export const createId = () => (Math.random() + 1).toString(36).substring(7)

export interface Task {
  id: string
  name: string
  date: string
}

export interface PlannerState {
  list: Task[];
  status: status;
  error: string
}

const initialState: PlannerState = {
  list: [],
  status: 'idle',
  error: ''
}

const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
      state.list.push({
        ...action.payload,
        id: createId(),
      })
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.list.splice(state.list.findIndex(item => item.id === action.payload), 1);
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.list = action.payload
    },
    setStatus: (state, action: PayloadAction<status>) => {
      state.status = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  }
})

export const {addTask, removeTask, setTasks, setStatus, setError} = plannerSlice.actions
export const selectTaskList = (state: RootState) => state.planner.list
export const selectStatus = (state: RootState) => state.planner.status
export const selectError = (state: RootState) => state.planner.error

export default plannerSlice.reducer
