import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

const MovieItem = (props) => {
  const item = props.item;
  const imageStartPath = "https://image.tmdb.org/t/p/w500";
  let navigate = useNavigate();

  const showMovieDetails = () => {
    navigate(`/${props.item.id}`);
  };

  return (
    <ImageListItem
      key={imageStartPath + item.poster_path}
      onClick={showMovieDetails}
    >
      <img
        src={`${
          imageStartPath + item.poster_path
        }?w=50%&fit=crop&auto=format&dpr=2 2x`}
        alt={item.title}
        loading="lazy"
      />
      <ImageListItemBar
        title={item.title}
        subtitle={item.overview.substring(0, 500)}
        actionIcon={
          <IconButton
            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
            aria-label={`info about ${item.title}`}
          >
            <InfoIcon />
          </IconButton>
        }
      />
    </ImageListItem>
  );
};

export default MovieItem;
