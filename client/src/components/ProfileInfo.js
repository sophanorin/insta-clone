import {
  Avatar,
  Button,
  FormLabel,
  Grid,
  Input,
  makeStyles,
  Typography,
  withStyles,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow, uploadprofile } from "../actions/userActions";

const useStyles = makeStyles((theme) => ({
  profile: {
    top: 0,
    height: "30vh",
    borderBottom: "1px solid #000",
    marginBottom: 0,
  },
  profile_image: {
    height: theme.spacing(20),
    width: theme.spacing(20),
    [theme.breakpoints.down("730")]: {
      height: theme.spacing(15),
      width: theme.spacing(15),
    },
  },
  info: {
    marginLeft: "2rem",
    "& > *": {
      marginTop: "0.5rem",
    },
  },
  follows: {
    "& > span ": { marginRight: "2rem" },
  },
  botton: {
    display: "none",
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#0095F6"),
    backgroundColor: "#0095F6",
    "&:hover": {
      backgroundColor: "#0078c7",
    },
  },
}))(Button);
function ProfileInfo(user) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const FollowHandler = () => {
    dispatch(follow(user._id));
  };
  const UnfollowHandler = () => {
    dispatch(unfollow(user._id));
  };

  const UploadImage = async (e) => {
    const image = e.target.files[0];
    const info = new FormData();
    info.append("file", image);
    info.append("upload_preset", "kxiv2d2e");
    info.append("cloud_name", "Rinnn");
    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/lecloud/image/upload",
        info
      );
      if (data) {
        setPic(data.secure_url);
        dispatch(uploadprofile({ pic: data.secure_url }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container item className={classes.profile}>
      <Grid
        container
        item
        xs={4}
        justify="center"
        alignItems="center"
        direction="column"
      >
        <Avatar
          className={classes.profile_image}
          src={user.pic}
          alt="any name"
        ></Avatar>
        {user.variant === "owner" && (
          <div>
            <input
              id="file"
              type="file"
              className="upload-image"
              accept="image/*"
              onChange={UploadImage}
            ></input>
            <label htmlFor="file" className="label-upload">
              Change Profile
            </label>
          </div>
        )}
      </Grid>
      <Grid container item xs={8}>
        <Grid
          container
          item
          direction="column"
          justify="center"
          alignItems="flex-start"
          className={classes.info}
        >
          <Typography className={classes.profile_name} variant="h5">
            {user.name}
          </Typography>
          <Typography className={classes.profile_name} variant="h6">
            {user.email}
          </Typography>
          <Typography className={classes.follows}>
            <span>{user.number ? user.number.length : 0} posts</span>{" "}
            <span>
              {user.followers ? user.followers.length : "0"} followers
            </span>{" "}
            <span>
              {user.following ? user.following.length : "0"} following
            </span>
          </Typography>
          {user.variant !== "owner" &&
            (user.followers && user.followers.includes(user.__id) ? (
              <ColorButton
                variant="contained"
                color="primary"
                onClick={UnfollowHandler}
              >
                Unfollow
              </ColorButton>
            ) : (
              <ColorButton
                variant="contained"
                color="primary"
                onClick={FollowHandler}
              >
                Follow
              </ColorButton>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileInfo;
