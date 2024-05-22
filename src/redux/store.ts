import { configureStore } from "@reduxjs/toolkit";
import { blogsSlice } from "./blogs-slice/blogs-slice";

export const store = configureStore({
  reducer: {
    [blogsSlice.name]: blogsSlice.reducer,
  },
});
