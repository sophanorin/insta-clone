import Axios from "axios";
import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_ALL_POST_FAIL,
  GET_MY_POST_REQUEST,
  GET_MY_POST_SUCCESS,
  GET_MY_POST_FAIL,
  UNLIKE_POST_REQUEST,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAIL,
  COMMENT_POST_REQUEST,
  COMMENT_POST_SUCCESS,
  COMMENT_POST_FAIL,
  DELETE_POST_FAIL,
} from "../constants/postConstants";

export const createpost = (post) => async (dispatch, getState) => {
  dispatch({ type: CREATE_POST_REQUEST, post });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("api/post/createpost", post, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getallpost = () => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get("/api/post/allpost", {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: GET_ALL_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const mypost = () => async (dispatch, getState) => {
  dispatch({ type: GET_MY_POST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios("/api/post/mypost", {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: GET_MY_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_MY_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const likepost = (postId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      "/api/post/like",
      { postId },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({ type: LIKE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIKE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const unlikepost = (postId) => async (dispatch, getState) => {
  dispatch({ type: UNLIKE_POST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await Axios.put(
      "/api/post/unlike",
      { postId },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: UNLIKE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UNLIKE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const commentspost = (postId, text) => async (dispatch, getState) => {
  dispatch({ type: COMMENT_POST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await Axios.put(
      "api/post/comments",
      { postId, text },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: COMMENT_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COMMENT_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletepost = (postId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/post/delete/${postId}`);
    const {
      userPosts: { posts },
    } = getState();
    const newPosts = posts.filter((post) => post._id !== data._id);
    dispatch({ type: GET_ALL_POST_SUCCESS, payload: newPosts });
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
