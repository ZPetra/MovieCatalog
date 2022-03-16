import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useContext } from "react";
import MovieContext from "../store/movie-context";

const SelectComponent = (props) => {
  const movieCtx = useContext(MovieContext);

  const handleChange = (event) => {
    movieCtx.setFilterValue(event.target.value);

    const filteredGenres = movieCtx.movieList.filter((f) => (f.genre_ids.includes(event.target.value) === true));
    movieCtx.setFilteredList(filteredGenres);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          {props.filterName}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={movieCtx.filter}
          label={props.filterName}
          onChange={handleChange}
        >
          {props.items &&
            props.items.map((item) => {
              return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>;
            })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectComponent;
