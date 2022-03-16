import useHttp from ".././hooks/use-http";
import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import SelectComponent from "../UI/SelectComponent";
import classes from "./Home.module.css";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const Home = () => {
  const [genres, setGenres] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [audienceMovies, setAudienceMovies] = useState([]);
  const [filter, setFilter] = useState("");
  const { isLoading, error, sendRequest } = useHttp();

  const applyMovies = (data) => {
    setAllMovies(data.results);
    setFilteredMovies(data.results);
    setAudienceMovies(data.results);
  };

  const applyGenres = (data) => {
    setGenres(data.genres);
  };

  useEffect(() => {
    sendRequest(
      { url: "https://api.themoviedb.org/3/search/movie" },
      applyMovies
    );
  }, [sendRequest]);

  useEffect(() => {
    sendRequest(
      { url: "https://api.themoviedb.org/3/genre/movie/list" },
      applyGenres
    );
  }, [sendRequest]);

  const filterMovies = (event) => {
    setFilter(event.target.value);
  };

  const filterMoviesByGenre = (genre) => {
    const filteredGenres = allMovies.filter(
      (f) => f.genre_ids.includes(genre) === true
    );
    setFilteredMovies(filteredGenres);
    setAudienceMovies(filteredGenres);
  };

  const selectAudience = (event) => {
    let filteredMoviesTemp = [];

    switch (event.target.value) {
      case "adults":
        filteredMoviesTemp = filteredMovies.filter((m) => m.adult === true);
        setAudienceMovies(filteredMoviesTemp);
        return;
      case "kids":
        filteredMoviesTemp = filteredMovies.filter((m) => m.adult === false);
        setAudienceMovies(filteredMoviesTemp);
        return;
      default:
        setAudienceMovies(filteredMovies);
        return;
    }
   
  };

  return (
    <div>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 300,
          marginTop: 2,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Movie"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={filterMovies}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      <div className={classes.box}>
        <SelectComponent
          className={classes.selectCmp}
          filterName="Genres"
          items={genres ? genres : [{ name: "", value: "" }]}
          filter={filter}
          filterMovies={filterMoviesByGenre}
        ></SelectComponent>
      </div>

      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Audience</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="all"
          name="radio-buttons-group"
          onChange={selectAudience}
        >
          <FormControlLabel value="adults" control={<Radio />} label="Adults" />
          <FormControlLabel value="kids" control={<Radio />} label="Kids" />
          <FormControlLabel value="all" control={<Radio />} label="All" />
        </RadioGroup>
      </FormControl>

      <MovieList movies={audienceMovies} filter={filter}></MovieList>
    </div>
  );
};

export default Home;
