import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "./userSlice";
import codeSlice from "./codeSlice";

export const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
    codeSlice: codeSlice,
  },
});
