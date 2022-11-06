import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { fetchingData } from "../redux/actions";
import Typography from "@material-ui/core/Typography";
import { IconButton, ImageListItemBar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    margin: "5%",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  title: {
    color: "black",
  },
  userProfile: {
    color: "black",
    display: "flex",
    alignItems: "center",
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "white",
  },
  imageList: {
    width: "100%",
    // Promote the list into its own layer in Chrome. This cost memory, but helps keep FPS high.
    transform: "translateZ(0)",
  },
}));

export default function Body() {
  const data = useSelector((state) => state.data);
  const classes = useStyles();
  const [detailView, setDetailView] = useState(false);
  const [detailItem, setDetailItem] = useState();

  const onClickPic = (id) => {
    const detailedItem = data.filter((item) => item.id === id);
    setDetailItem(detailedItem);
    setDetailView(true);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={detailView == false ? 12 : 8}>
          <ImageList rowHeight={200} cols={5} gap={10}>
            {data &&
              data.map((tile) => (
                <ImageListItem key={tile.id}>
                  <img
                    src={tile.previewURL}
                    alt={tile.id}
                    onClick={() => onClickPic(tile.id)}
                  />
                </ImageListItem>
              ))}
          </ImageList>
        </Grid>
        {detailView && detailItem && (
          <Grid item xs={4} sm={4}>
            <ImageList rowHeight={"auto"} className={classes.imageList}>
              <ImageListItem
                key={detailItem.id}
                style={{ width: "100%", height: "100%" }}
              >
                <img src={detailItem[0].webformatURL} alt={detailItem.id} />
                <ImageListItemBar
                  title={detailItem.id}
                  position="top"
                  actionIcon={
                    <IconButton
                      className={classes.icon}
                      onClick={() => {
                        setDetailView(false);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                  actionPosition="right"
                  className={classes.titleBar}
                />
              </ImageListItem>
            </ImageList>

            <Typography variant="h6" className={classes.title}>
              {`Views: ${detailItem[0].views}`}
            </Typography>
            <Typography variant="h6" className={classes.title}>
              {`Size: ${detailItem[0].imageSize}`}
            </Typography>
            <Typography variant="h6" className={classes.title}>
              {`Likes: ${detailItem[0].likes}`}
            </Typography>
            <Typography variant="h6" className={classes.userProfile}>
              {`User: `}
              <img
                src={detailItem[0].userImageURL}
                alt={detailItem[0].user}
                width={25}
                height={25}
              />
              {detailItem[0].user}
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
