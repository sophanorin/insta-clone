import { Grid, GridList, GridListTile, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mypost } from "../actions/postActions.js";
import Loading from "../components/Loading.js";
const useStyle = makeStyles({
  gallery: {
    marginTop: "4rem",
    flexGrow: 1,
    "& > img": {
      width: "100%",
      height: "100%",
    },
  },
  image: {
    boxShadow: "0 0 20px rgba(0,0,0,0.2),0 0 40px rgba(0,0,0,0.3)",
    maxWidth: "100%",
    "& > img": {
      minWidth: "100%",
    },
  },
});

function Gallery(myPosts) {
  const classes = useStyle();

  const { error, loading, posts } = myPosts;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Grid container item xs={12} className={classes.gallery}>
          <GridList cellHeight={300} cols={3}>
            {posts.map((post) => (
              <GridListTile key={post._id} className={classes.image}>
                <img src={post.photo} alt={post.caption} />
              </GridListTile>
            ))}
          </GridList>
        </Grid>
      )}
    </>
  );
}

export default Gallery;
