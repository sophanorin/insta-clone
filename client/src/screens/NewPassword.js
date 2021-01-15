import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  checktoken,
  requestreset,
  setnewpassword,
  signup,
  uploadprofile,
} from "../actions/userActions.js";
import Loading from "../components/Loading.js";
import { RESET_STATE } from "../constants/userConstants.js";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewPassword(props) {
  const classes = useStyles();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");

  const UpdatedPassword = useSelector((state) => state.UpdatedPassword);
  const { message, error, success, user } = UpdatedPassword;

  const expireToken = useSelector((state) => state.expireToken);
  const { expire } = expireToken;

  const dispatch = useDispatch();

  const token = props.match.params.token;

  const ResetPasswordHandler = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassowrd) alert("Both password aren't matching");
    else {
      dispatch(setnewpassword(token, newPassword));
    }
  };

  const PustToSigninHandler = () => {
    props.history.replace("/signin");
  };

  const PustToRequestHandler = () => {
    props.history.replace("/reset");
  };

  useEffect(() => {
    if (success) {
      if (user) {
        dispatch({ type: RESET_STATE });
        props.history.push("/signin");
      }
    }
    dispatch(checktoken(token));
  }, [dispatch, token, user]);

  return (
    <>
      {expire !== undefined ? (
        expire ? (
          <>
            <Dialog
              open={expire}
              TransitionComponent={Transition}
              keepMounted
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {"Link Request Reset Password expired."}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Your link was requested is expired. Please make a request
                  again.
                  <br />
                  To make a new request, Click Ok.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={PustToRequestHandler} color="primary">
                  Ok
                </Button>
                <Button onClick={PustToSigninHandler} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar
                className={classes.avatar}
                src="https://parentzone.org.uk/sites/default/files/Instagram%20logo.jpg"
              ></Avatar>
              <Typography component="h1" variant="h5">
                New Password
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={ResetPasswordHandler}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="new-password"
                      label="New Password"
                      name="new-password"
                      type="password"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="confirm-password"
                      label="Confirm Password"
                      type="password"
                      id="confirmpassword"
                      autoComplete="current-password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Send
                </Button>
              </form>
            </div>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Container>
        )
      ) : (
        <></>
      )}
    </>
  );
}
