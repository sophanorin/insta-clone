import {
  COMMENT_POST_FAIL,
  COMMENT_POST_REQUEST,
  COMMENT_POST_SUCCESS,
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_RESET,
  CREATE_POST_SUCCESS,
  GET_ALL_POST_FAIL,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_MY_POST_FAIL,
  GET_MY_POST_REQUEST,
  GET_MY_POST_SUCCESS,
  LIKE_POST_FAIL,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  POST_RESET,
  UNLIKE_POST_FAIL,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
} from "../constants/postConstants";

export const createpostReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { loading: true, success: false };
    case CREATE_POST_SUCCESS:
      return { loading: false, success: true };
    case CREATE_POST_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_POST_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const getallpostReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_ALL_POST_SUCCESS:
      return { loading: false, posts: action.payload };
    case GET_ALL_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getmypostReducer = (
  state = { loading: true, posts: [] },
  action
) => {
  switch (action.type) {
    case GET_MY_POST_REQUEST:
      return { loading: true };
    case GET_MY_POST_SUCCESS:
      return { loading: false, posts: action.payload };
    case GET_MY_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const likepostReducer = (state = { like: false }, action) => {
  switch (action.type) {
    case LIKE_POST_SUCCESS:
      return { liked: true, post: action.payload };
    case LIKE_POST_FAIL:
      return { success: false, error: action.payload };
    case POST_RESET:
      return {};
    default:
      return state;
  }
};

export const unlikepostReducer = (state = {}, action) => {
  switch (action.type) {
    case UNLIKE_POST_REQUEST:
      return { loading: true };
    case UNLIKE_POST_SUCCESS:
      return { loading: false, post: action.payload };
    case UNLIKE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentpostReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_POST_REQUEST:
      return { loading: true };
    case COMMENT_POST_SUCCESS:
      return { loading: false, post: action.payload };
    case COMMENT_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
