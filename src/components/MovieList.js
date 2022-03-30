import ImageList from "@mui/material/ImageList";
import MovieItem from "./MovieItem";
import useWindowDimensions from "../hooks/use-window-dimensions";
import { Pagination } from "@mui/material";
import usePagination from ".././UI/Pagination";
import { useState } from "react";

const MovieList = (props) => {
  const { height, width } = useWindowDimensions();

  let [page, setPage] = useState(1);
  const PER_PAGE = 20;

  const count = Math.ceil(props.movies && props.movies.length / PER_PAGE);
  const _DATA = usePagination(
    props.movies != null ? props.movies : [],
    PER_PAGE
  );

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <div>
      {props.loading && (
        <h3
          style={{
            display: "flex",
            alignItems: "center",
            height: "500px",
            justifyContent: "center",
          }}
        >
          Loading Movies...
        </h3>
      )}

      {!props.loading && (
        <div>
          <Pagination
            count={count}
            page={page}
            color="primary"
            onChange={handleChange}
          />
          <ImageList sx={{ width: width, height: height }} cols={4}>
            {props.movies &&
              _DATA
                .currentData()
                .filter((f) => f.title.toLowerCase().includes(props.search))
                .map((movie) => {
                  return <MovieItem key={movie.id} item={movie}></MovieItem>;
                })}
          </ImageList>
          <Pagination
            count={count}
            page={page}
            color="primary"
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default MovieList;
