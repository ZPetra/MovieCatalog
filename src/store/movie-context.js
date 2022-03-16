import React from "react";

const MovieContext = React.createContext({
    filter: "",
    filteredList: [],
    movieList: [],
    setMovieList: (list) => {},
    setFilteredList: (list) => {},
    setFilterValue: (filter) => {}
});

export default MovieContext;