import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import SearchBar from "material-ui-search-bar";
import { useDispatch } from "react-redux";
import { fetchingData } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // flexGrow: 1,
    display: "inline",
  },
  searchBar: {
    margin: "0 auto",
    maxWidth: 800,
  },
}));

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");
  const [sortKey, setSortKey] = useState("views");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const sortItems = (type) => {
    setSortKey(type);
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(fetchingData(sessionStorage.pageNumber, searchKey, sortKey));
  }, [searchKey, sortKey, sessionStorage.pageNumber]);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Bose Gallery
          </Typography>
          <SearchBar
            onRequestSearch={(value) => {
              sessionStorage.pageNumber = 1;
              setSearchKey(value);
            }}
            placeholder={"Search for an image"}
            className={classes.searchBar}
          />
          <div>
            <Button
              aria-controls="sort-items"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MenuIcon htmlColor="#ffffff" />
            </Button>
            <Menu
              id="sort-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={sortItems}
            >
              <MenuItem onClick={() => sortItems("views")}>
                Sort by Views
              </MenuItem>
              <MenuItem onClick={() => sortItems("imageSize")}>
                Sort by Image Size
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
