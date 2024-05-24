import { FC, useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Breadcrumbs,
  Skeleton,
  Grid,
  breadcrumbsClasses,
} from "@mui/material";
import { BlogPicture } from "../components/blog-picture/blog-picture";
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
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    return () => clearTimeout(timeout.current);
  }, [blogId]);

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
          Такой блог не найден
        </Typography>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            {loading ? <Skeleton width={300} /> : blog!.title}
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
              {loading ? (
                <>
                  <Skeleton variant="rectangular" height={300} />
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {blog!.content}
                </Typography>
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
                  width={400}
                  sx={{ borderRadius: "15px" }}
                />
              ) : (
                <BlogPicture src={blog!.img} />
              )}
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};
