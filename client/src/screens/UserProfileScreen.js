import { Grid, GridList, GridListTile, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuserprofile } from "../actions/userActions.js";
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

function UserProfileScreen(props) {
  const classes = useStyles();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  // if (!userInfo) props.history.push("/signin");

  const id = props.match.params.id;

  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  //optimize here next time
  const { loading, error, posts, user } = userProfile;

  useEffect(() => {
    dispatch(getuserprofile(id));
  }, [dispatch, userSignin, id]);

  return (
    <>
      <TopBar />
      <Grid
        container
        className={classes.root}
        direction="column"
        alignItems="flex-start"
      >
        <ProfileInfo
          {...user}
          variant={user && id === userInfo._id ? "owner" : "user"}
          number={posts}
          __id={userInfo._id}
        />
        <Gallery posts={posts} loading={loading} />
      </Grid>
    </>
  );
}

export default UserProfileScreen;
