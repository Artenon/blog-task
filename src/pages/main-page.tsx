import { FC, useState, useEffect } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { BlogCard } from "../components/blog-card/blog-card";
import { BlogCardSkeleton } from "../components/blog-card/skeleton";
import { Table } from "../components/table/table";
import { Search } from "../components/search/search";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { getBlogs, getSearchQuery } from "../redux/blogs-slice/selectors";

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(true);

  const blogs = useAppSelector(getBlogs);
  const searchQuery = useAppSelector(getSearchQuery);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [dispatch]);

  const filteredBlogs = blogs.filter((blog) => {
    if (searchQuery === "") {
      return blog;
    } else if (
      blog.title.toLowerCase().trim().includes(searchQuery.toLowerCase().trim()) ||
      blog.content.toLowerCase().trim().includes(searchQuery.toLowerCase().trim())
    ) {
      return blog;
    }
  });

  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
        marginBottom={1}
      >
        <Typography variant="h5">Статьи</Typography>
        <Search />
      </Box>
      <Grid container spacing={2} marginBottom={2}>
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
              <BlogCardSkeleton />
            </Grid>
          ))
        ) : filteredBlogs.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6">Ничего не найдено :(</Typography>
          </Grid>
        ) : (
          filteredBlogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <BlogCard blog={blog} />
            </Grid>
          ))
        )}
      </Grid>
      {!loading && <Table />}
    </Container>
  );
};
