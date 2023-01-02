import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchTodoList} from "./todoAPI";

export const createId = () => (Math.random() + 1).toString(36).substring(7)

export interface TodoItem {
  id: string
  name: string
}

export interface TodoState {
  list: TodoItem[];
  status: 'idle' | 'loading' | 'failed';
  error: string
}

const initialState: TodoState = {
  list: [],
  status: 'idle',
  error: ''
}

export const getTodoListAsync = createAsyncThunk(
  'todo/getTodoList',
  async () => {
    const response = await fetchTodoList()
    return response.data
  }
)

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.list.push({name: action.payload, id: createId()})
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.list.splice(state.list.findIndex(item => item.id === action.payload), 1);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodoListAsync.fulfilled, (state, action) => {
          state.list = action.payload
          state.status = 'idle'
        }
      )
      .addCase(getTodoListAsync.pending, (state) => {
          state.status = 'loading'
        }
      )
      .addCase(getTodoListAsync.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error?.message || ''
        }
      )
  }
})

export const {addTodo, removeTodo} = todoSlice.actions
export const selectTodo = (state: RootState) => state.todo.list
export const selectStatus = (state: RootState) => state.todo.status
export const selectError = (state: RootState) => state.todo.error

export default todoSlice.reducer
