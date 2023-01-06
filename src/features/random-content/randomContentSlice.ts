import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {status} from '../../app/types'

export interface ContentItem {
  name: string;
  status: status;
  error: string
}

export type RandomContentKeys = 'dogImg' | 'catFact' | 'activity'

export type RandomContentState = { [key in RandomContentKeys]: ContentItem };

export type ContentPayload = PayloadAction<{ name: ContentItem["name"] }>
export type StatusPayload = PayloadAction<{ status: ContentItem["status"] }>
export type ErrorPayload = PayloadAction<{ error: ContentItem["error"] }>

const initialState: RandomContentState = {
  dogImg: {
    name: '',
    status: 'idle',
    error: ''
  },
  catFact: {
    name: '',
    status: 'idle',
    error: ''
  },
  activity: {
    name: '',
    status: 'idle',
    error: ''
  }
}

const randomContentSlice = createSlice({
  name: 'randomContent',
  initialState,
  reducers: {
    setDogImgName: (state, action: ContentPayload) => {
      state.dogImg.name = action.payload.name
    },
    setDogImgStatus: (state, action: StatusPayload) => {
      state.dogImg.status = action.payload.status
    },
    setDogImgError: (state, action: ErrorPayload) => {
      state.dogImg.error = action.payload.error
    },

    setCatFactName: (state, action: ContentPayload) => {
      state.catFact.name = action.payload.name
    },
    setCatFactStatus: (state, action: StatusPayload) => {
      state.catFact.status = action.payload.status
    },
    setCatFactError: (state, action: ErrorPayload) => {
      state.catFact.error = action.payload.error
    },

    setActivityName: (state, action: ContentPayload) => {
      state.activity.name = action.payload.name
    },
    setActivityStatus: (state, action: StatusPayload) => {
      state.activity.status = action.payload.status
    },
    setActivityError: (state, action: ErrorPayload) => {
      state.activity.error = action.payload.error
    },
  }
})

export const {
  setDogImgName,
  setDogImgStatus,
  setDogImgError,

  setCatFactName,
  setCatFactStatus,
  setCatFactError,

  setActivityName,
  setActivityStatus,
  setActivityError,
} = randomContentSlice.actions

export const selectDogImg = (state: RootState) => state.randomContent.dogImg
export const selectCatFact = (state: RootState) => state.randomContent.catFact
export const selectActivity = (state: RootState) => state.randomContent.activity

export default randomContentSlice.reducer
