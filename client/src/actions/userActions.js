import Axios from "axios";
import {
  USER_FOLLOW_REQUEST,
  USER_FOLLOW_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_REQUEST_RESET_PASSWORD,
  USER_SEARCHING,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_UPLOAD_PROFILE_FAIL,
  USER_UPLOAD_PROFILE_SUCCESS,
  USER_FAIL_RESET_PASSWORD,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
  USER_UPDATED,
  CHECK_TOKEN,
} from "../constants/userConstants";

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_SIGNOUT });
};

export const signup = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post("/api/users/signup", {
      name,
      email,
      password,
    });
    dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const searchuser = (query) => async (dispatch) => {
  try {
    const { data } = await Axios.post(`/api/users/query/${query}`);

    dispatch({ type: USER_SEARCHING, payload: data });
  } catch {}
};

export const requestreset = (email) => async (dispatch) => {
  try {
    console.log(email);
    const { data } = await Axios.get(`/api/users/reset-password/${email}`);

    dispatch({ type: USER_REQUEST_RESET_PASSWORD, payload: data });
  } catch (error) {
    dispatch({
      type: USER_FAIL_RESET_PASSWORD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getuserprofile = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_PROFILE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`/api/users/${userId}`, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const follow = (followerId) => async (dispatch, getState) => {
  dispatch({ type: USER_FOLLOW_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      "/api/users/follow",
      { followerId },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: { ...userInfo, ...data.following, password: undefined },
    });

    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        ...userInfo,
        followers: data.following.followers,
        following: data.following.following,
      })
    );
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const unfollow = (followerId) => async (dispatch, getState) => {
  dispatch({ type: USER_FOLLOW_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      "/api/users/unfollow",
      { followerId },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: { ...userInfo, ...data.following, password: undefined },
    });

    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        ...userInfo,
        followers: data.following.followers,
        following: data.following.following,
      })
    );
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const uploadprofile = ({ pic }) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      "/api/users/update",
      { pic },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({ type: USER_UPLOAD_PROFILE_SUCCESS, payload: data });
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ ...userInfo, pic: data.pic })
    );
  } catch (error) {
    dispatch({
      type: USER_UPLOAD_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setnewpassword = (token, password) => async (
  dispatch,
  getState
) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put("/api/users/update-password", {
      token,
      password,
    });

    dispatch({ type: USER_UPDATE_PASSWORD_SUCCESS, payload: data });

    if (userInfo) {
      dispatch({ type: USER_UPDATED, payload: data.user });
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...userInfo, ...data })
      );
    }
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const checktoken = (token) => async (dispatch) => {
  try {
    const { data } = await Axios.get(`/api/users/checkToken/${token}`);
    dispatch({ type: CHECK_TOKEN, payload: data });
  } catch {}
};
