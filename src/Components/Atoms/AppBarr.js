import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import logo from "../../Assets/Images/PACRA_logo.png";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import {
  Link,
  Navigate,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Download, Logout, WindowSharp } from "@mui/icons-material";
import Auth from "../../middleWare/Auth/Auth";
import { useRef } from "react";
import { Clear, Search } from "@material-ui/icons";
import { Fab, TextField } from "@material-ui/core";
import { Autocomplete, Box, Stack } from "@mui/material";
import GetData from "../../API/GetData";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  themeColor: {
    color: "#204162",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#204162",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  img: {
    width: "45px",
    height: "45px",
  },
  sectionDesktop: {
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

export default function AppBarr(props) {
  const history = useNavigate();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [sendingReq, setsendingReq] = useState(false);
  const [errorMessage, seterrorMessage] = useState(false);

  const handleSearch = (event, newValue) => {
    setsendingReq(true);
    if (newValue !== null) {
      history(`/OpinionDetails/${newValue.OpinionId}`);
    }
    event.preventDefault();
    // event.target.reset();
  };

  // const [search, setSearch] = useState(false);
  // const onChangeSearch = () => {
  //   setSearch(!search);
  // }

  // const inputRef = useRef(null);

  // useEffect(() => {
  //   if (search) {
  //     inputRef.current.focus();
  //   }
  // }, [search]);

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

  var userName = localStorage.getItem("username");

  var userImage = localStorage.getItem("userImage");

  // }
  const signout = () => {
    Auth.logout();
    history("/Login");
    window.location.reload();
  };

  const location = useLocation();
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className="topMargin"
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
      <MenuItem>
        <a
          href="https://expo.dev/artifacts/95502b7f-80d2-4715-a7d4-d22afea83aac"
          className="text-dark d-md-none"
        >
          <Download className="theme_text me-2" /> Install App
        </a>
      </MenuItem>
      <MenuItem onClick={signout}>
        {" "}
        <Logout className="theme_text me-2" /> Log Out
      </MenuItem>
    </Menu>
  );

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
        <IconButton aria-label="show 4 new mails">
          <Badge badgeContent={4} color="secondary">
            <MailIcon className={classes.themeColor} />
          </Badge>
        </IconButton>
        <p className={classes.themeColor}>Messages</p>
      </MenuItem> */}
      {/* <MenuItem>
        <IconButton aria-label="show 11 new notifications">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon className={classes.themeColor} />
          </Badge>
        </IconButton>
        <p className={classes.themeColor}>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <img
          src={`https://209.97.168.200/hr/public/users/${userImage}`}
          className="avatar"
        />
        <p className={`mb-0 ${classes.themeColor}`}> {userName} </p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={`onPrintNone ${classes.grow}`}>
      <AppBar position="fixed" className={props.clasname}>
        <Toolbar className="px-0">
          <IconButton
            onClick={props.SideNavOpen}
            onClose={props.SideNavClose}
            edge="start"
            className={`${classes.menuButton} mx-2 ${props.clasName}`}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <div className="ms-3">
            {!props.isOpen ? (
              <img
                src={logo}
                className={`d-none d-md-block ${classes.img}`}
                alt="logo"
              />
            ) : null}
          </div>
          {/* <Fab
            color="neutral"
            aria-label="edit"
            variant="extended"
            className="mx-2 mt-2 fabCustom mb-1"
          >
            {search ? (
              <Clear onClick={onChangeSearch} className="theme_text" />
            ) : (
              <Search onClick={onChangeSearch} className="theme_text" />
            )}
            <div className={`p-2 ${search ? "d-block" : "d-none"}`}>
              <input
                autoFocus={search && "true"}
                ref={inputRef}
                className="form-control"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                id="filter-text-box"
              />
            </div>
          </Fab> */}
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          {userName === "Muhammad Hamza Saleem" && (
            <div className="col-7 col-md-4 col-lg-3 ms-md-3">
              <Autocomplete
                freeSolo
                options={props.Opinions}
                getOptionLabel={(option) =>
                  `${option.Opinion} ${option.OpinionId}`
                }
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.Opinion}
                  </Box>
                )}
                // getOptionLabel={(option) => option.Opinion}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Opinion"
                    className="theme_text"
                    variant="standard"
                    size="small"
                  />
                )}
                onChange={handleSearch}
              />
            </div>
          )}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon className={classes.themeColor} />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon className={classes.themeColor} />
              </Badge>
            </IconButton> */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <img
                src={`https://209.97.168.200/hr/public/users/${userImage}`}
                className="avatar"
              />
              <p className="username mb-0 me-2 fs-5"> {userName} </p>
              {/* <AccountCircle className={classes.themeColor} /> */}
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              className={classes.themeColor}
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
