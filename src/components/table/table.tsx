import { FC, useState } from "react";
import {
  Table as MUITable,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  TableCell,
  Paper,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useAppSelector } from "../../hooks/store";
import { getBlogs } from "../../redux/blogs-slice/selectors";

export const Table: FC = () => {
  const blogs = useAppSelector(getBlogs);

  const [article, setArticle] = useState<string>(blogs[0].title);

  const getAllSymbols = () => {
    let symbols = 0;
    blogs.forEach((blog) => {
      symbols += blog.content.length;
    });
    return symbols;
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setArticle(event.target.value);
  };

  const getCommentsCount = () => {
    if (article !== "") {
      const comments = blogs.filter((blog) => blog.title.includes(article))[0].comments;
      return comments ? comments.length : 0;
    }
  };

  return (
    <TableContainer component={Paper}>
      <MUITable>
        <TableHead>
          <TableRow>
            <TableCell width="20%" sx={{ fontWeight: "bold" }}>
              Количество статей
            </TableCell>
            <TableCell width="25%" sx={{ fontWeight: "bold" }}>
              Общее количество символов
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              Количество комментариев к
              <FormControl fullWidth>
                <Select
                  size="small"
                  id="select"
                  name="select"
                  value={article}
                  onChange={handleSelectChange}
                >
                  {blogs.map((blog) => (
                    <MenuItem key={blog.id} value={blog.title}>
                      {blog.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>{blogs.length}</TableCell>
            <TableCell>{getAllSymbols()}</TableCell>
            <TableCell>{getCommentsCount()}</TableCell>
          </TableRow>
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};
