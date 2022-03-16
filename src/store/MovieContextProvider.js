import MovieContext from "./movie-context";
import { useState, useCallback } from "react";

const MovieContextProvider = (props) => {
  const [filteredList, setFilteredList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [searchFilter, setFilter] = useState("");

  const setFilterValueFunction = useCallback((search) => {
    setFilter(search);
  }, []);

  const setFilteredListFunction = useCallback((list) => {
    setFilteredList(list);
  }, []);

  const setMovieListFunciton = useCallback((list) => {
    setMovieList(list);
  }, []);

  const contextValue = {
    filter: searchFilter,
    filteredList: filteredList,
    movieList: movieList,
    setFilterValue: setFilterValueFunction,
    setFilteredList: setFilteredListFunction,
    setMovieList: setMovieListFunciton,
    /*  setFilteredList: (list) => {
      setFilteredList(list);
    },
    setMovieList: (list) => {
      setMovieList(list);
    }, */
  };

  return (
    <MovieContext.Provider value={contextValue}>
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
