import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.js";
import CreatePost from "./screens/CreatePost.js";
import HomeScreen from "./screens/HomeScreen.js";
import NewPassword from "./screens/NewPassword.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import ResetPassword from "./screens/ResetPassword.js";
import SignIn from "./screens/SignInScreen.js";
import SignUp from "./screens/SignUpScreen.js";
import UserProfileScreen from "./screens/UserProfileScreen.js";
import "./style.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeScreen}></Route>
        <Route path="/signin" component={SignIn}></Route>
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/post" component={CreatePost}></Route>
        <Route path="/profile" exact component={ProfileScreen}></Route>
        <Route path="/reset" exact component={ResetPassword}></Route>
        <Route path="/reset/:token" component={NewPassword}></Route>
        <PrivateRoute path="/:id?" component={UserProfileScreen}></PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
