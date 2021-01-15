import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopBar from "../components/TopBar.js";
import { createpost } from "../actions/postActions.js";
import Loading from "../components/Loading.js";
import { Alert } from "@material-ui/lab";
import { CREATE_POST_RESET } from "../constants/postConstants.js";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "90vh",

    "& > form": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50%",
      minWidth: "50%",
      "& > *": {
        marginTop: "2rem",
      },
    },
  },
  input: {
    width: "90ch",
    [theme.breakpoints.down("750")]: {
      width: "50ch",
    },
    [theme.breakpoints.down("470")]: {
      width: "30ch",
    },
  },
}));

function CreatePost(props) {
  const classes = useStyles();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const dispatch = useDispatch();

  const postDetail = useSelector((state) => state.postDetail);
  const { success, loading, error } = postDetail;

  const postDetails = async () => {
    const info = new FormData();
    info.append("file", image);
    info.append("upload_preset", "kxiv2d2e");
    info.append("cloud_name", "Rinnn");
    try {
      setLoadingUpload(true);
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/lecloud/image/upload",
        info
      );
      const { secure_url: url } = data;
      dispatch(createpost({ caption, url }));

      setLoadingUpload(false);
    } catch (error) {
      console.log(error);
    }
  };
  const submitHandler = () => {
    postDetails();
  };

  useEffect(() => {
    if (success) {
      props.history.push("/");
    }
    dispatch({ type: CREATE_POST_RESET });
  }, [success, dispatch, props.history]);

  return (
    <>
      <TopBar />
      {loading || loadingUpload ? (
        <Loading />
      ) : (
        <div className={classes.root}>
          {error && (
            <Alert variant="outlined" severity="error">
              {error}
            </Alert>
          )}
          <form>
            <TextField
              className={classes.input}
              id="standard-multiline-flexible"
              label="Caption"
              defaultValue={""}
              helperText="optional"
              multiline
              rows={4}
              onChange={(e) => setCaption(e.target.value)}
            />
            <TextField
              className={classes.input}
              id="choose-file"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <Button variant="contained" color="primary" onClick={submitHandler}>
              Post
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

export default CreatePost;
