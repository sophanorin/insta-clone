import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  commentpostReducer,
  createpostReducer,
  getallpostReducer,
  getmypostReducer,
  likepostReducer,
  unlikepostReducer,
} from "./reducers/postReducer";
import {
  userSigninReducer,
  userSignupReducer,
  userProfileReducer,
  FollowReducer,
  SearchingUserReducer,
  ResetPasswordReducer,
  UpdatedPasswordReducer,
  CheckTokenReducer,
} from "./reducers/userReducer";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const reducer = combineReducers({
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  postDetail: createpostReducer,
  userPosts: getallpostReducer,
  myPosts: getmypostReducer,
  postLike: likepostReducer,
  postUnlike: unlikepostReducer,
  postComments: commentpostReducer,
  userProfile: userProfileReducer,
  followData: FollowReducer,
  SearchingUser: SearchingUserReducer,
  ResetPassword: ResetPasswordReducer,
  UpdatedPassword: UpdatedPasswordReducer,
  expireToken: CheckTokenReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
