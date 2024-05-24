import { FC, useState, ChangeEvent, useEffect } from "react";
import { TextField, inputBaseClasses } from "@mui/material";
import { useAppDispatch } from "../../hooks/store";
import { useDebounce } from "../../hooks/useDebounce";
import { changeSearchQuery } from "../../redux/blogs-slice/blogs-slice";

import SearchIcon from "@mui/icons-material/Search";

export const Search: FC = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState<string>("");

  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    dispatch(changeSearchQuery(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <TextField
      value={query}
      onChange={handleChange}
      size="small"
      label="Поиск"
      InputProps={{
        endAdornment: <SearchIcon />,
      }}
      sx={{ [` .${inputBaseClasses.root}`]: { pr: 1 } }}
    />
  );
};
