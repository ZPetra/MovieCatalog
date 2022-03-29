import ImageList from "@mui/material/ImageList";
import MovieItem from "./MovieItem";
import useWindowDimensions from "../hooks/use-window-dimensions";

const MovieList = (props) => {
  const { height, width } = useWindowDimensions();

  return (
    <ImageList sx={{ width: width, height: height }} cols={4}>
      {props.movies &&
        props.movies
          .filter((f) => f.title.toLowerCase().includes(props.search))
          .map((movie) => {
            return <MovieItem key={movie.id} item={movie}></MovieItem>;
          })}

      {/*             {props.movies.length &&
            <MovieItem item={props.movies[0]}></MovieItem>} */}
    </ImageList>
  );
};

export default MovieList;
