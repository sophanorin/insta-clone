import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallpost } from "../actions/postActions.js";
import Card from "../components/Card.js";
import Loading from "../components/Loading.js";
import TopBar from "../components/TopBar.js";
function HomeScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) props.history.push("/signin");

  const dispatch = useDispatch();

  const userPosts = useSelector((state) => state.userPosts);
  const { error, posts } = userPosts;

  const postLike = useSelector((state) => state.postLike);
  const postUnlike = useSelector((state) => state.postUnlike);
  const postComments = useSelector((state) => state.postComments);

  useEffect(() => {
    if (userInfo) dispatch(getallpost());
  }, [dispatch, postLike, postUnlike, postComments]);

  return (
    <>
      <TopBar />
      {posts && (
        <Grid container direction="column" justify="center" alignItems="center">
          {posts.map((post) => (
            <Card key={post._id} {...post} />
          ))}
        </Grid>
      )}
    </>
  );
}

export default HomeScreen;
