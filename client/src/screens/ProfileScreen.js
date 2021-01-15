import { Grid, GridList, GridListTile, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mypost } from "../actions/postActions.js";
import Gallery from "../components/Gallery.js";
import Loading from "../components/Loading.js";
import ProfileInfo from "../components/ProfileInfo.js";
import TopBar from "../components/TopBar.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "70%",
    margin: "auto",
    minHeight: "90vh",
  },
  gallery: {
    marginTop: "4rem",
    flexGrow: 1,
    "& > img": {
      width: "100%",
      height: "100%",
    },
  },
}));

function ProfileScreen(props) {
  const classes = useStyles();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  if (!userInfo) props.history.push("/signin");

  const dispatch = useDispatch();
  const myPosts = useSelector((state) => state.myPosts);
  // const uploadedprofile = useSelector((state) => state.uploadedprofile);
  // const { loading, error, uploadInfo } = uploadedprofile;
  // console.log(uploadedprofile);
  useEffect(() => {
    dispatch(mypost());
  }, [dispatch, userInfo]);

  return (
    <>
      <TopBar />
      <Grid
        container
        className={classes.root}
        direction="column"
        alignItems="flex-start"
      >
        <ProfileInfo {...userInfo} variant="owner" number={myPosts.posts} />
        <Gallery {...myPosts} />
      </Grid>
    </>
  );
}

export default ProfileScreen;
