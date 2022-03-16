import MovieContext from "./movie-context";
import { useState } from "react";

const MovieContextProvider = (props) => {
  const [filteredList, setFilteredList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [searchFilter, setFilter] = useState("");

  const contextValue = {
    filter: searchFilter,
    filteredList: filteredList,
    movieList: movieList,
    setFilterValue: (search) => {
      setFilter(search);
    },
    setFilteredList: (list) => {
      setFilteredList(list);
    },
    setMovieList: (list) => {
      setMovieList(list);
    },
  };

  return (
    <MovieContext.Provider value={contextValue}>
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
