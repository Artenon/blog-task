import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, CardActions, Button, Typography } from "@mui/material";
import { IBlog } from "../../types/blog";

interface IBlogCardProps {
  blog: IBlog;
}

export const BlogCard: FC<IBlogCardProps> = ({ blog }) => {
  const navigate = useNavigate();
  const showMoreClickHandler = () => navigate(`/blog/${blog.id}`);

  return (
    <Card sx={{ maxHeight: "320px", color: "#625854" }}>
      <CardMedia component="img" loading="lazy" image={blog.img} height={150} alt="picture" />
      <CardContent sx={{ pb: 0 }}>
        <Typography
          gutterBottom
          variant="h5"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {blog.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.5,
            maxHeight: "4.5em",
          }}
        >
          {blog.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{ textTransform: "none" }} onClick={showMoreClickHandler}>
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );
};
