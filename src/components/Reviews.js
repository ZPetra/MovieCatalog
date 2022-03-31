import * as React from "react";
import { useState, useEffect } from "react";
import useHttp from ".././hooks/use-http";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from "@mui/material/Typography";

const Reviews = (props) => {
  const [reviews, setReviews] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();
  const imageStartPath = "https://image.tmdb.org/t/p/w500";

  const applyReviews = (data) => {
    setReviews(data[0].results);
  };

  useEffect(() => {
    sendRequest(
      {
        url: "https://api.themoviedb.org/3/movie/" + props.movieId + "/reviews",
      }, 1,
      applyReviews
    );
  }, [sendRequest, props.movieId]);

  return (
    <Card>
      <CardContent>
        <List
          sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}
        >
          {reviews &&
            reviews.map((review) => (
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={review.author_details.avatar_path && review.author_details.avatar_path.substring(1)} />
                </ListItemAvatar>
                <ListItemText
                  primary={review.created_at}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {review.author_details.username}
                      </Typography>
                      {review.content}
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          <Divider variant="inset" component="li" />
        </List>
      </CardContent>
    </Card>
  );
};

export default Reviews;
