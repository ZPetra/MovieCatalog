import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import useHttp from ".././hooks/use-http";
import classes from "./ModalDialog.module.css";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue, lightGreen } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Reviews from "../components/Reviews";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ModalDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [movie, setMovie] = useState();
  const { isLoading, error, sendRequest } = useHttp();

  const [expanded, setExpanded] = React.useState(false);

  const imageStartPath = "https://image.tmdb.org/t/p/w500";

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const applyMovie = (data) => {
    setMovie(data);
  };

  useEffect(() => {
    sendRequest(
      { url: `https://api.themoviedb.org/3/movie/${props.movieId}` },
      1,
      applyMovie
    );
  }, [sendRequest, props.movieId]);

  const handleClose = () => {
    props.onClose();
  };

  return (
    <div>
      {props.open &&
        (props.open === true ? (
          <Dialog
            fullScreen={fullScreen}
            open={props.open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={"lg"}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Movie Details"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Card sx={{ maxWidth: "100%", alignSelf: "center" }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ bgcolor: blue[500] }}
                        aria-label="moviecatalog"
                      >
                        {movie.title.substring(0, 1).toUpperCase()}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={movie && movie.title}
                    subheader={
                      movie &&
                      movie.genres.map(
                        (genre, i) =>
                          genre.name +
                          (i === movie.genres.length - 1 ? "" : ", ")
                      )
                    }
                  />
                  <CardContent>
                    <div className={classes["flex-container"]}>
                      <div>
                        <CardMedia
                          component="img"
                          height="400"
                          image={movie && imageStartPath + movie.poster_path}
                          alt="poster"
                          className={classes.img}
                        />
                      </div>
                      <div>
                        <Typography variant="subtitle1">
                          Duration: {movie.runtime}min
                        </Typography>
                        <Typography paragraph variant="subtitle1">
                          Imdb Rate: {movie && movie.vote_average}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                          {movie && movie.overview}
                        </Typography>
                        <hr></hr>
                        <Typography paragraph variant="body2">
                          Original Title: {movie && movie.original_title}
                        </Typography>
                        <Typography paragraph variant="body2">
                          Original Language: {movie && movie.original_language}
                        </Typography>

                        <Typography paragraph variant="body2">
                          Release Date: {movie && movie.release_date}
                        </Typography>

                        <Typography paragraph variant="body2">
                          Production Companies: {movie &&
                            movie.production_companies.map(
                              (company) => company.name + " "
                            )}
                        </Typography>

                        <Typography paragraph variant="body2">
                          Production Countries: {movie &&
                            movie.production_countries.map(
                              (country) => country.name + " "
                            )}
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                  <CardActions disableSpacing>
                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      {"Reviews "}
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Reviews movieId={movie.id}></Reviews>
                  </Collapse>
                </Card>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        ) : null)}
    </div>
  );
}
