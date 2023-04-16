import { configureStore } from "@reduxjs/toolkit";
import { reduxBatch } from "@manaflair/redux-batch";
import { rootReducer } from "./root-reducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    }),
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [reduxBatch],
});

export type AppDispatch = typeof store.dispatch;

export default store;
