import * as React from 'react';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useHttp from ".././hooks/use-http";
import classes from "./MovieDetails.module.css";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));


const MovieDetails = () => {
  const { movieId } = useParams();
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
      { url: `https://api.themoviedb.org/3/movie/${movieId}` },
      applyMovie
    );
  }, [sendRequest, movieId]);

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="moviecatalog">
            MC
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={movie && movie.title}
        subheader={movie && movie.genres.map((genre) => genre.name + " ")}
      />
      <CardMedia
        component="img"
        height="400"
        image={movie && imageStartPath + movie.poster_path}
        alt="poster"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {movie && movie.overview}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography paragraph variant="body1">Original Title:</Typography>
          <Typography paragraph variant="body2">
            {movie && movie.original_title}
          </Typography>

          <Typography paragraph variant="body1">Original Language:</Typography>
          <Typography paragraph variant="body2">
            {movie && movie.original_language}
          </Typography>

          <Typography paragraph variant="body1">Release Date:</Typography>
          <Typography paragraph variant="body2">
            {movie && movie.release_date}
          </Typography>

          <Typography paragraph variant="body1">Imdb Rate:</Typography>
          <Typography paragraph variant="body2">
            {movie && movie.vote_average}
          </Typography>

          <Typography paragraph variant="body1">Production Companies:</Typography>
          <Typography paragraph variant="body2">
            {movie && movie.production_companies.map((company) => company.name + " ")}
          </Typography>

          <Typography paragraph variant="body1">Production Countries:</Typography>
          <Typography paragraph variant="body2">
            {movie && movie.production_countries.map((country) => country.name + " ")}
          </Typography>
         
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default MovieDetails;
