import { useContext } from "react";
import ImageList from "@mui/material/ImageList";
import MovieItem from "./MovieItem";
import useWindowDimensions from "../hooks/use-window-dimensions";
import classes from "./MovieList.module.css";
import MovieContext from "../store/movie-context";

const MovieList = () => {
  const { height, width } = useWindowDimensions();
  const movieCtx = useContext(MovieContext);

  return (
      <ImageList sx={{ width: width, height: height }} cols={4}>
        {movieCtx.filteredList &&
          movieCtx.filteredList
            .filter((f) => f.title.toLowerCase().includes(movieCtx.filter))
            .map((movie) => {
              return <MovieItem key={movie.id} item={movie}></MovieItem>;
            })}
      </ImageList>
  );
};

export default MovieList;
