import { FC, useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import { BlogCard } from "../components/blog-card/blog-card";
import { BlogCardSkeleton } from "../components/blog-card/skeleton";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { setBlogs } from "../redux/blogs-slice/blogs-slice";
import { getBlogs } from "../redux/blogs-slice/selectors";

import data from "../data/data.json";

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  const blogs = useAppSelector(getBlogs);

  useEffect(() => {
    Promise.resolve(data)
      .then((data) => {
        setTimeout(() => {
          dispatch(setBlogs(data.blogs));
          setLoading(false);
        }, 750);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Main Page
      </Typography>
      <Grid container spacing={2}>
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
                <BlogCardSkeleton />
              </Grid>
            ))
          : blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog.id}>
                <BlogCard blog={blog} />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};
