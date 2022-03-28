import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import ModalDialog from "../UI/ModalDialog";
import { useState } from "react";

const MovieItem = (props) => {
  const item = props.item;
  const imageStartPath = "https://image.tmdb.org/t/p/w500";
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);

  /* const showMovieDetails = () => {
    navigate(`/${props.item.id}`);
  }; */

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <ImageListItem
      key={imageStartPath + item.poster_path}
      //onClick={showMovieDetails}
      onClick={handleClickOpen}
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

      <ModalDialog open={open}></ModalDialog>
    </ImageListItem>
  );
};

export default MovieItem;
