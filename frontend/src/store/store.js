import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
  },
});
