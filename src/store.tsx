import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from './reducers/loaderSlice'

const store = configureStore({
  reducer: {
    loader: loaderReducer,
  },
})

export type rootState = ReturnType<typeof store.getState>;

export default store;