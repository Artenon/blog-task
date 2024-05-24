import { RootState } from "../../types/store";

export const getBlogs = (state: RootState) => state.BLOGS.blogs;

export const getSearchQuery = (state: RootState) => state.BLOGS.searchQuery;
