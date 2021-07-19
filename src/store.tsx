import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from './reducers/loaderSlice'

const store = configureStore({
  reducer: {
    reminder: loaderReducer,
  },
})

export default store;