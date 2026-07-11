import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  code: "// Write your first JavaScript code",
  language: "javascript",
};

const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },

    clearCode: (state) => {
      state.code = "// Write your first JavaScript code";
    },
  },
});

export const { setCode, setLanguage, clearCode } = codeSlice.actions;
export default codeSlice.reducer;
