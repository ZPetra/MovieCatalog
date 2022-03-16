import ImageList from "@mui/material/ImageList";
import MovieItem from "./MovieItem";
import useWindowDimensions from "../hooks/use-window-dimensions";
import classes from "./MovieList.module.css";

const MovieList = (props) => {
  const { height, width } = useWindowDimensions();

  return (
      <ImageList sx={{ width: width, height: height }} cols={4}>
        {props.movies &&
          props.movies
            .filter((f) => f.title.toLowerCase().includes(props.filter))
            .map((movie) => {
              return <MovieItem key={movie.id} item={movie}></MovieItem>;
            })}
      </ImageList>
  );
};

export default MovieList;
