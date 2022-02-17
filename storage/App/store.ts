import { configureStore } from "@reduxjs/toolkit";
import AppReducer from "../Slices/appSlice";
import userReducer from "../Slices/userSlice";

export const store = configureStore({
  reducer: {
    app: AppReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
