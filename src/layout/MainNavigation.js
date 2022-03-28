import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import classes from "./MainNavigation.module.css";

export default function SearchAppBar(props) {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={classes.clickable}
            variant="h5"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              fontWeight: 600,
            }}
            onClick={() => {
              navigate("/");
              window.location.reload();
            }}
          >
            Movies Catalog
          </Typography>
          {props.paths.map((path, i) => {
            return (
              <Typography
                className={classes.clickable}
                key={i}
                variant="h6"
                color="inherit"
                component="div"
                sx={{ mr: 4 }}
                onClick={() => {
                  navigate(`/${path.path}`);
                  window.location.reload();
                }}
              >
                {path.title}
              </Typography>
            );
          })}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
