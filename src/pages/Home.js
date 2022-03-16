import useHttp from ".././hooks/use-http";
import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import SelectComponent from "../UI/SelectComponent";
import classes from "./Home.module.css";
import RadioButtonGroup from "../UI/RadioButtonGroup";
import SearchComponent from "../UI/SearchComponent";

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
      <SearchComponent
        filterMovies={filterMovies}
        placeholder={"Search Movie"}
      ></SearchComponent>

      <div className={classes.box}>
        <SelectComponent
          className={classes.selectCmp}
          filterName="Genres"
          items={genres ? genres : [{ name: "", value: "" }]}
          filter={filter}
          filterMovies={filterMoviesByGenre}
        ></SelectComponent>
      </div>

      <RadioButtonGroup
        selectAudience={selectAudience}
        defaultValue={"all"}
        groupName={"Audience"}
        radioList={[
          { value: "adults", label: "Adults" },
          { value: "kids", label: "Kids" },
          { value: "all", label: "all" },
        ]}
      ></RadioButtonGroup>

      <MovieList movies={audienceMovies} filter={filter}></MovieList>
    </div>
  );
};

export default Home;
