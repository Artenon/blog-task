import { FC, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  InputBase,
  Typography,
  FormControl,
  Box,
  Button,
  InputLabel,
  inputLabelClasses,
  styled,
} from "@mui/material";
import { useAppDispatch } from "../hooks/store";
import { addBlog } from "../redux/blogs-slice/blogs-slice";
import { IBlog } from "../types/blog";

const Input = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(1.5),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#fff",
    border: "1px solid",
    borderColor: "#E0E3E7",
    fontSize: 16,
    color: "#625854",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    "&:focus": {
      boxShadow: "#625854 0 0 0 2px",
    },
  },
}));

export const CreatePage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<IBlog, "id">>({
    title: "",
    content: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: IBlog = { ...formData, id: Date.now(), comments: [] };
    dispatch(addBlog(data));
    navigate("/");
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Создание статьи
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl sx={{ marginY: 1 }} fullWidth>
              <InputLabel
                shrink
                htmlFor="title"
                sx={{
                  fontSize: 18,
                  left: -10,
                  transition: ".2s",
                  [`&.${inputLabelClasses.focused}`]: {
                    color: "#625854",
                    fontWeight: "bold",
                  },
                }}
              >
                Заголовок *
              </InputLabel>
              <Input fullWidth id="title" name="title" onChange={handleChange} required />
            </FormControl>

            <FormControl sx={{ marginY: 1 }} fullWidth>
              <InputLabel
                shrink
                htmlFor="content"
                sx={{
                  fontSize: 18,
                  left: -10,
                  transition: ".2s",
                  [`&.${inputLabelClasses.focused}`]: {
                    color: "#625854",
                    fontWeight: "bold",
                  },
                }}
              >
                Содержание *
              </InputLabel>
              <Input
                multiline
                minRows={4}
                fullWidth
                id="content"
                name="content"
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl sx={{ marginY: 1 }} fullWidth>
              <InputLabel
                shrink
                htmlFor="img"
                sx={{
                  fontSize: 18,
                  left: -10,
                  transition: ".2s",
                  [`&.${inputLabelClasses.focused}`]: {
                    color: "#625854",
                    fontWeight: "bold",
                  },
                }}
              >
                URL на картинку
              </InputLabel>
              <Input fullWidth id="img" name="img" onChange={handleChange} />
            </FormControl>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 2,
            marginTop: 1,
          }}
        >
          <Button sx={{ color: "#625754" }} onClick={() => navigate(-1)}>
            Отмена
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "rgba(61,48,45, 0.8)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              ":hover": {
                backgroundColor: "rgba(61,48,45, 0.9)",
              },
            }}
          >
            Создать
          </Button>
        </Box>
      </form>
    </Container>
  );
};
