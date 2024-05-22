import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBlog } from "../../types/blog";

const initialState: {
  blogs: IBlog[];
} = {
  blogs: [],
};

export const blogsSlice = createSlice({
  name: "BLOGS",
  initialState,
  reducers: {
    addBlog: (state, action: PayloadAction<IBlog>) => {
      state.blogs.push(action.payload);
    },
  },
});
