import { FC, useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import { BlogCard } from "../components/blog-card/blog-card";
import { BlogCardSkeleton } from "../components/blog-card/skeleton";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { getBlogs } from "../redux/blogs-slice/selectors";

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(true);

  const blogs = useAppSelector(getBlogs);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Статьи
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
