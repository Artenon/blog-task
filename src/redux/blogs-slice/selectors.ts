import { RootState } from "../../types/store";

export const getBlogs = (state: RootState) => state.BLOGS.blogs;
