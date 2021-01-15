import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Button, Collapse, InputBase, Menu, MenuItem } from "@material-ui/core";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  commentspost,
  deletepost,
  likepost,
  unlikepost,
} from "../actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import ModeComment from "@material-ui/icons/ModeComment";
import { Link } from "react-router-dom";
import { follow, unfollow } from "../actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "50rem",
    margin: "1rem 0rem",
  },
  media: {
    height: "40rem",
    width: "40rem",
    objectFit: "cover",
    overflow: "hidden",
    "& div": {
      width: "100%",
      height: "100%",
    },
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  expandOpen: {
    color: "#0ee660",
    fill: "#0ee660",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(post) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const isSettingOpen = Boolean(anchorEl);
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const formateDate = () => {
    var weekday = new Array();
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    const date = new Date(post.createdAt);
    let wday = weekday[date.getUTCDay()];
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

    return `${wday} ,${day}-${month}-${year}`;
  };

  const LikeHandler = () => {
    dispatch(likepost(post._id));
  };

  const UnlikeHandler = () => {
    dispatch(unlikepost(post._id));
  };

  const CommentHandler = () => {
    if (comment) {
      dispatch(commentspost(post._id, comment));
    }
    setComment("");
  };

  const DeletePostHandler = () => {
    dispatch(deletepost(post._id));
  };

  const ExpandHandler = () => {
    setExpanded(!expanded);
  };
  // ------------------------ //
  const OpenSetting = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const FollowHandler = () => {
    dispatch(follow(post.postedBy._id));
  };
  const UnfollowHandler = () => {
    dispatch(unfollow(post.postedBy._id));
  };

  const menuId = "primary-setting-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={isSettingOpen}
      onClose={handleMenuClose}
    >
      {post.postedBy._id !== userInfo._id &&
        (userInfo.following.includes(post.postedBy._id) ? (
          <MenuItem onClick={UnfollowHandler}>Unfollow</MenuItem>
        ) : (
          <MenuItem onClick={FollowHandler}>Follow</MenuItem>
        ))}

      {post.postedBy._id === userInfo._id && (
        <MenuItem onClick={DeletePostHandler}>Delete Post</MenuItem>
      )}
    </Menu>
  );

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={post.postedBy.pic && post.postedBy.pic}
          >
            {post.postedBy.name.substring(0, 1)}
          </Avatar>
        }
        action={
          <IconButton
            edge="end"
            aria-label="settings"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={OpenSetting}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={<Link to={`/${post.postedBy._id}`}>{post.postedBy.name}</Link>}
        subheader={formateDate()}
      />
      <div className={classes.media}>
        <Zoom
          zoomMargin={130}
          overlayBgColorEnd="rgba(0,0,0,0.3)"
          style={{ cursor: "pointer" }}
        >
          <img
            src={post.photo}
            alt={post.postedBy.name}
            className={classes.image}
          />
        </Zoom>
      </div>
      <CardContent>
        <Typography paragraph component="p">
          {post.caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {post.likes.includes(userInfo ? userInfo._id : " ") ? (
          <IconButton aria-label="add to favorites" onClick={UnlikeHandler}>
            <FavoriteIcon style={{ color: "#f54747" }} />
          </IconButton>
        ) : (
          <IconButton aria-label="add to favorites" onClick={LikeHandler}>
            <FavoriteBorderIcon />
          </IconButton>
        )}
        <Typography variant="body1" component="p">
          {post.likes.length} likes
        </Typography>
        {expanded ? (
          <IconButton
            className={classes.expandOpen}
            aria-label="comment"
            onClick={ExpandHandler}
          >
            <ModeComment />
          </IconButton>
        ) : (
          <IconButton aria-label="comment" onClick={ExpandHandler}>
            <ModeCommentOutlinedIcon />
          </IconButton>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {post.comments.length > 0 &&
            post.comments.map((comment) => (
              <Typography key={comment.text} variant="body1" component="p">
                <strong>{comment.commentedBy.name}</strong> : {comment.text}
              </Typography>
            ))}
        </CardContent>
      </Collapse>
      <CardActions style={{ margin: "0rem 1rem" }}>
        <InputBase
          style={{ width: "100%" }}
          placeholder="Add a comments"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "comments" }}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button style={{ color: "#0095F6" }} onClick={CommentHandler}>
          Post
        </Button>
      </CardActions>
      {renderMenu}
    </Card>
  );
}
