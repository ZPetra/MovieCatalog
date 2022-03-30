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
  const [search, setSearch] = useState("");
  const { isLoading, error, sendRequest } = useHttp();

  const applyMovies = (data) => {
    let list = [];
    for (let i = 0; i < data.length; i++) {
      list = list.concat(data[i].results);
    }

    setAllMovies(list);
    setFilteredMovies(list);
    setAudienceMovies(list);
  };

  const applyGenres = (data) => {
    setGenres(data[0].genres);
  };

  useEffect(() => {
    const pathname = window.location.pathname;

    let url =
      "https://api.themoviedb.org/3/movie" +
      (pathname !== "/" ? pathname : "/popular");

    sendRequest({ url: url }, 10, applyMovies);
  }, [sendRequest]);

  useEffect(() => {
    sendRequest(
      { url: "https://api.themoviedb.org/3/genre/movie/list" },
      1,
      applyGenres
    );
  }, [sendRequest]);

  const filterMovies = (event) => {
    setSearch(event.target.value);
  };

  const filterMoviesByGenre = (genre) => {
    let filteredGenres = allMovies;

    if (genre === "all") filteredGenres = allMovies;
    else
      filteredGenres = allMovies.filter(
        (f) => f.genre_ids.includes(genre) === true
      );

    setFilter(genre);
    setFilteredMovies(filteredGenres);
    setAudienceMovies(filteredGenres);
  };

  const selectAudience = (event) => {
    let filteredMoviesTemp = [];

    switch (event.target.value) {
      case "adults":
        //this is because it filters adult movies when adult is false
        filteredMoviesTemp = filteredMovies.filter((m) => m.adult === false);
        setAudienceMovies(filteredMoviesTemp);
        return;
      case "kids":
        filteredMoviesTemp = filteredMovies.filter((m) => m.adult === true);
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
      <div className={classes.gridContainer}>
        <div className={classes.gridItem}>
          <SelectComponent
            className={classes.selectCmp}
            filterName="Genres"
            items={genres ? genres : [{ name: "", value: "" }]}
            filter={filter}
            filterMovies={filterMoviesByGenre}
          ></SelectComponent>
        </div>

        {/*  <div className={classes.gridItem}>
          <RadioButtonGroup
            selectAudience={selectAudience}
            defaultValue={"all"}
            groupName={"Audience"}
            radioList={[
              { value: "adults", label: "Adults" },
              { value: "kids", label: "Kids" },
              { value: "all", label: "All" },
            ]}
          ></RadioButtonGroup>
        </div> */}
      </div>
      {/*       {isLoading && <div>Loading movies...</div>}
      {!isLoading && ( */}
      <div className={classes.movies}>
        <MovieList
          movies={audienceMovies}
          search={search}
          loading={isLoading}
        ></MovieList>
      </div>
      {/*       )}
       */}{" "}
    </div>
  );
};

export default Home;
