import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { ClassNames } from "@emotion/react";

import classes from "./MainNavigation.module.css";

export default function SearchAppBar(props) {

  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         {/*  <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            className={classes.clickable}
            variant="h6"
            noWrap
            component="div"
            onClickCapture={Typography}
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            onClick={() => {navigate("/");}}
          >
            Movies Catalog
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
