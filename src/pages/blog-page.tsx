import { FC, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Breadcrumbs,
  Skeleton,
  Grid,
  breadcrumbsClasses,
} from "@mui/material";
import { useAppSelector } from "../hooks/store";
import { getBlogs } from "../redux/blogs-slice/selectors";
import { BlogPicture } from "../components/blog-picture/blog-picture";
import { Comments } from "../components/comments/comments";
import { IBlog } from "../types/blog";

import HomeIcon from "@mui/icons-material/Home";

export const BlogPage: FC = () => {
  const { blogId } = useParams<{ blogId: string }>();

  const [loading, setLoading] = useState<boolean>(true);
  const [blog, setBlog] = useState<IBlog | null>(null);

  const blogs = useAppSelector(getBlogs);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const foundBlog = blogs.find((blog) => blog.id === Number(blogId));
      if (foundBlog) {
        setBlog(foundBlog);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [blogId, blogs]);

  return (
    <Container>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          marginY: 1,
          [` .${breadcrumbsClasses.ol}`]: {
            flexWrap: "nowrap",
            maxWidth: "88%",
          },
          [` .${breadcrumbsClasses.li}`]: {
            maxWidth: "100%",
          },
        }}
      >
        <Link
          className="underline"
          to="/"
          style={{ display: "flex", alignItems: "center", gap: 6 }}
        >
          <HomeIcon htmlColor="rgba(61,48,45, 0.8)" />
          <Typography sx={{ display: { xs: "none", sm: "block" } }}>Главная</Typography>
        </Link>
        <Typography
          color="text.primary"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {loading ? <Skeleton variant="rectangular" width={150} height={20} /> : blog?.title}
        </Typography>
      </Breadcrumbs>
      {!blog && !loading ? (
        <Typography variant="h5" gutterBottom>
          Такая статья не найдена
        </Typography>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            {loading ? <Skeleton width={300} /> : blog!.title}
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
              {loading ? (
                <Skeleton variant="rectangular" height={300} />
              ) : (
                <>
                  <Typography variant="body1" color="text.secondary" marginBottom={2}>
                    {blog!.content}
                  </Typography>
                  <Comments blog={blog!} />
                </>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              order={{ xs: 1, md: 2 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {loading ? (
                <Skeleton
                  variant="rectangular"
                  height={200}
                  width={350}
                  sx={{ borderRadius: "15px" }}
                />
              ) : (
                blog?.img && <BlogPicture src={blog?.img} />
              )}
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};
