import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBlog } from "../../types/blog";

import data from "../../data/data.json";

const initialState: {
  blogs: IBlog[];
  searchQuery: string;
} = {
  blogs: data.blogs,
  searchQuery: "",
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
    changeSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setBlogs, addBlog, addComment, changeSearchQuery } = blogsSlice.actions;
