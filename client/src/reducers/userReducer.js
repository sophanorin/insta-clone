import {
  USER_FAIL_RESET_PASSWORD,
  USER_FOLLOW_FAIL,
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
  USER_UPDATED,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
  RESET_STATE,
  CHECK_TOKEN,
} from "../constants/userConstants";

export const userSigninReducer = (
  state = { loading: true, userInfo: {} },
  action
) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPLOAD_PROFILE_SUCCESS:
      return { userInfo: { ...state.userInfo, pic: action.payload.pic } };
    case USER_UPLOAD_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATED:
      return { userInfo: { ...state.userInfo, ...action.payload } };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const userSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return { loading: false, success: true };
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const userProfileReducer = (
  state = { loading: true, posts: [{}], user: {} },
  action
) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true };
    case USER_PROFILE_SUCCESS:
      return {
        loading: false,
        posts: action.payload.posts,
        user: action.payload.user,
      };
    case USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const FollowReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FOLLOW_REQUEST:
      return { loading: true };
    case USER_FOLLOW_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case USER_FOLLOW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const SearchingUserReducer = (
  state = { searchingResult: [] },
  action
) => {
  switch (action.type) {
    case USER_SEARCHING:
      return { searchingResult: action.payload };
    default:
      return state;
  }
};

export const ResetPasswordReducer = (state = { message: "" }, action) => {
  switch (action.type) {
    case USER_REQUEST_RESET_PASSWORD:
      return { message: action.payload };
    case USER_FAIL_RESET_PASSWORD:
      return { error: action.payload };
    default:
      return state;
  }
};

export const UpdatedPasswordReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case USER_UPDATE_PASSWORD_SUCCESS:
      return {
        message: action.payload.message,
        success: true,
        user: action.payload.user,
      };
    case USER_UPDATE_PASSWORD_FAIL:
      return { error: action.payload.error, success: false };
    case RESET_STATE:
      return {};
    default:
      return state;
  }
};

export const CheckTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_TOKEN:
      return { expire: action.payload.expire };
    default:
      return state;
  }
};
