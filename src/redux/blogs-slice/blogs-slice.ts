import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBlog } from "../../types/blog";

import data from "../../data/data.json";

const initialState: {
  blogs: IBlog[];
} = {
  blogs: data.blogs,
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
