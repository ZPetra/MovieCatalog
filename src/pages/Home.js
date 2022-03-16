import useHttp from ".././hooks/use-http";
import { useEffect, useState, useContext, useCallback, useMemo } from "react";
import MovieList from "../components/MovieList";
import SelectComponent from "../UI/SelectComponent";
import classes from "./Home.module.css";
import MovieContext from "../store/movie-context";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const Home = () => {
  const [genres, setGenres] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();

  const movieCtx = useContext(MovieContext);

  const applyMovies = useCallback(
    (data) => {
      movieCtx.setMovieList(data.results);
      movieCtx.setFilteredList(data.results);
    },
    [movieCtx]
  );

  /*  const applyMovies = (data) => {
    movieCtx.setMovieList(data.results);
    movieCtx.setFilteredList(data.results);
  }; */

  const applyGenres = (data) => {
    setGenres(data.genres);
  };

  useEffect(() => {
    sendRequest(
      { url: "https://api.themoviedb.org/3/search/movie" },
      applyMovies
    );
  }, [sendRequest, applyMovies]);

  useEffect(() => {
    sendRequest(
      { url: "https://api.themoviedb.org/3/genre/movie/list" },
      applyGenres
    );
  }, [sendRequest]);

  const filterMovies = (event) => {
    movieCtx.setFilterValue(event.target.value);
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
        ></SelectComponent>
      </div>

      <FormGroup>
        <FormControlLabel control={<Switch defaultChecked />} label="Adults" />
      </FormGroup>

      <MovieList></MovieList>
    </div>
  );
};

export default Home;
