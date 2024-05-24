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
    addComment: (state, action: PayloadAction<{ blogId: number; comment: string }>) => {
      const { blogId, comment } = action.payload;
      state.blogs.map((blog) => {
        if (blog.id === blogId) {
          blog.comments!.push(comment);
        }
      });
    },
  },
});

export const { setBlogs, addBlog, addComment } = blogsSlice.actions;
