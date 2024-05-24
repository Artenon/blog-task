import { FC, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  inputBaseClasses,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useAppDispatch } from "../../hooks/store";
import { addComment } from "../../redux/blogs-slice/blogs-slice";
import { IBlog } from "../../types/blog";

import SendIcon from "@mui/icons-material/Send";

interface ICommentsProps {
  blog: IBlog;
}

export const Comments: FC<ICommentsProps> = ({ blog }) => {
  const dispatch = useAppDispatch();

  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      dispatch(addComment({ blogId: blog.id, comment }));
      setLoading(false);
      setComment("");
    }, 300);
  };

  return (
    <Box>
      {blog.comments && blog.comments.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Комментарии
          </Typography>
          {blog.comments.map((comment, idx) => (
            <Typography
              key={`comment-${idx}`}
              sx={{ py: 0.5, px: 1, backgroundColor: "rgba(0,0,0,0.1)", m: 0.5, borderRadius: 2 }}
            >
              {comment}
            </Typography>
          ))}
        </>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          size="small"
          placeholder="Добавить комментарий"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          sx={{ [` .${inputBaseClasses.root}`]: { pr: 0 }, pt: 1 }}
          InputProps={{
            endAdornment: (
              <IconButton disableRipple type="submit" disabled={comment.length === 0}>
                {loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              </IconButton>
            ),
          }}
        />
      </form>
    </Box>
  );
};
