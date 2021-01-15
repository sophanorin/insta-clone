import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CreateIcon from "@material-ui/icons/Create";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchuser, signout } from "../actions/userActions";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    width: "100%",
    position: "sticky",
    top: 0,
    zIndex: "1",
  },
  bar: {
    width: "80%",
    margin: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "white",
    display: "none",
    fontFamily: "Grand Hotel, cursive",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    flexGrow: 1,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "transparent",
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "100%",
    },
    overFlow: "hidden",
  },
  inputRoot: {
    color: "inherit",
    width: "95%",
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    "& > div": {
      border: "2px solid white",
      color: "inherit",
    },
    // vertical padding + font size from searchIcon
  },
  inputInput: {
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar() {
  let history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [query, setQuery] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const SearchingUser = useSelector((state) => state.SearchingUser);
  const { searchingResult } = SearchingUser;

  //error!!!!!!!!
  //console.log(searchingResult);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const searching = (query) => {
    dispatch(searchuser(query));
  };

  const ProfileHandler = () => {
    history.push("/profile");
    handleMenuClose();
  };
  const LogoutHandler = () => {
    history.push("/signin");
    dispatch(signout());
  };

  const SearchHandler = (e) => searching(e.target.value);

  const BroweUserHandler = (e) => {
    if (e.key === "Enter") {
      console.log(e.target.value);
      const user = searchingResult.filter(
        (user) => user.name === e.target.value
      );
      console.log(e);
      if (user) history.push(`/${user[0]._id}`);
    }
  };

  // const menuId = "primary-search-account-menu";
  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{ vertical: "top", horizontal: "right" }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{ vertical: "top", horizontal: "right" }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem onClick={ProfileHandler}>Profile</MenuItem>
  //     <MenuItem onClick={LogoutHandler}>Logout</MenuItem>
  //   </Menu>
  // );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem>
        <Link to="/post">
          <IconButton
            aria-label="create-post"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <CreateIcon />
          </IconButton>
        </Link>
        <p>Create Post</p>
      </MenuItem>

      <MenuItem onClick={ProfileHandler}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={LogoutHandler}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ExitToAppIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  useEffect(() => {
    if (!userInfo) {
      history.push("/signin");
    }
  }, []);

  return (
    <div className={classes.grow}>
      <AppBar position="sticky">
        <Toolbar className={classes.bar}>
          <Link to="/">
            <Typography variant="h4" className={classes.title}>
              Instagram
            </Typography>
          </Link>
          <div className={classes.search}>
            <Autocomplete
              freeSolo
              disableClearable
              autoComplete
              autoHighlight
              autoSelect
              options={searchingResult.map((option) => option.name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  classes={{
                    root: classes.inputRoot,
                  }}
                  margin="dense"
                  placeholder="Search"
                  variant="outlined"
                  onChange={SearchHandler}
                  onKeyDown={BroweUserHandler}
                />
              )}
            />
          </div>

          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <Link to="/post">
              <IconButton
                aria-label="show 17 new notifications"
                style={{ color: "#fff" }}
              >
                <CreateIcon />
              </IconButton>
            </Link>

            <IconButton
              aria-label="profile"
              onClick={ProfileHandler}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <IconButton
              onClick={LogoutHandler}
              aria-label="logout"
              color="inherit"
            >
              <ExitToAppIcon />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
