import { configureStore } from "@reduxjs/toolkit";
import { blogsSlice } from "./blogs-slice/blogs";

export const store = configureStore({
  reducer: {
    [blogsSlice.name]: blogsSlice.reducer,
  },
});
