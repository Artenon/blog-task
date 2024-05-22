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
    setBlogs: (state, action: PayloadAction<IBlog[]>) => {
      state.blogs = action.payload;
    },
    addBlog: (state, action: PayloadAction<IBlog>) => {
      state.blogs.push(action.payload);
    },
  },
});

export const { setBlogs, addBlog } = blogsSlice.actions;
