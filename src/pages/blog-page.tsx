import { FC, useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Container, Typography, Breadcrumbs, Skeleton } from "@mui/material";
import { IBlog } from "../types/blog";

import HomeIcon from "@mui/icons-material/Home";

import data from "../data/data.json";

export const BlogPage: FC = () => {
  const { blogId } = useParams<{ blogId: string }>();

  const [loading, setLoading] = useState<boolean>(true);
  const [blog, setBlog] = useState<IBlog | null>(null);

  const timeout = useRef<number | undefined>();

  useEffect(() => {
    Promise.resolve(data)
      .then((data) => {
        timeout.current = setTimeout(() => {
          const foundBlog = data.blogs.find((blog) => blog.id === Number(blogId));
          if (foundBlog) {
            setBlog(foundBlog);
          }
          setLoading(false);
        }, 300);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    return () => clearTimeout(timeout.current);
  }, [blogId]);

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginY: 1 }}>
        <Link
          className="underline"
          to="/"
          style={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <HomeIcon htmlColor="rgba(61,48,45, 0.8)" />
          Главная
        </Link>
        <Typography color="text.primary">
          {loading ? <Skeleton variant="rectangular" width={150} height={20} /> : blog?.title}
        </Typography>
      </Breadcrumbs>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={400} />
      ) : !blog ? (
        <Typography variant="h5" gutterBottom>
          Такой блог не найден
        </Typography>
      ) : (
        <Box>
          <img src={blog.img} alt={blog.title} />
          <Typography variant="h5" gutterBottom>
            {blog.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {blog.content}
          </Typography>
        </Box>
      )}
    </Container>
  );
};
