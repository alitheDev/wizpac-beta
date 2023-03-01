import React, { useState } from "react";
import clsx from "clsx";
import logo from "../../Assets/Images/PACRA_logo.png";
import { useNavigate } from "react-router-dom";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  useTheme,
  CssBaseline,
  Drawer,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {
  Apps,
  ContactMail,
  AssignmentInd,
  Dashboard,
  Home,
  Star,
  GridOn,
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
  Search,
  Assessment,
  MenuBook,
} from "@material-ui/icons";
import AppBarr from "./AppBarr";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Auth from "../../middleWare/Auth/Auth";
import { Business, Factory } from "@mui/icons-material";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    background: "#E8E8E8",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#E8E8E8",
    overflowX: "hidden",
    width: "0px",
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo: {
    width: "130px",
    height: "130px",
    display: "flex",
    margin: " 0px auto 0px auto",
  },
  listItem: {
    color: "#204162",
  },
  bottom: {
    position: "absolute",
    bottom: "0",
  },
}));

const listItems = [
  {
    listIcon: <Home />,
    listText: "PACRA",
    listLink: "/pacra-wide",
  },
  {
    listIcon: <Star />,
    listText: "Ratings",
    listLink: "/Ratings",
  },
  {
    listIcon: <MenuBook />,
    listText: "P + V",
    listLink: "/PacVis",
  },
  // {
  //   listIcon: <Assessment />,
  //   listText: "Reports",
  //   listLink: "/Reports",
  // },
  // {
  //     listIcon: <Apps />,
  //     listText: "VIS",
  //     listLink: "/VIS"
  // },
  // {
  //     listIcon: <AssignmentInd />,
  //     listText: "P + V",
  //     listLink: "/P&V"
  // },
];

export default function SideBar(props) {
  const [isOpened, setisOpened] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const depName = localStorage.getItem("depName");
  const history = useNavigate();

  const signout = () => {
    Auth.logout();
    history("/Login");
    window.location.reload();
  };

  return (
    <div className={`onPrintNone ${classes.root}`}>
      <CssBaseline />
      <AppBarr
        clasname={clsx(classes.appBar, {
          [classes.appBarShift]: props.open,
        })}
        // loginState={props.loginState}

        isOpen={props.open}
        Opinions={props.Opinions}
        SideNavOpen={props.handleDrawerOpen}
        SideNavClose={props.handleDrawerClose}
        clasName={clsx(classes.menuButton, {
          [classes.hide]: props.open,
        })}
      />
      <Drawer
        anchor="left"
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={props.handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <div className={classes.menuSliderContainer}>
            {props.open ? (
              <img src={logo} className={classes.logo} alt="" />
            ) : null}
            <Divider />
            <List>
              {depName == 9 ? (
                <>
                  <ListItem
                    className={classes.listItem}
                    onClick={() => setisOpened(!isOpened)}
                    button
                  >
                    {props.open ? (
                      <>
                        <ListItemIcon className={classes.listItem}>
                          <GridOn />
                        </ListItemIcon>
                        <ListItemText primary="Grid" />
                        <ListItemIcon className={classes.listItem}>
                          {isOpened ? <ExpandMore /> : <ExpandLess />}
                        </ListItemIcon>
                      </>
                    ) : (
                      <ListItemIcon className={classes.listItem}>
                        {isOpened ? <ExpandMore /> : <ExpandLess />}
                      </ListItemIcon>
                    )}
                  </ListItem>
                  <List className={isOpened ? "d-none" : null}>
                    {listItems.map((listItem, index) => (
                      <Link to={listItem.listLink} className="activeClass">
                        <ListItem
                          className={classes.listItem}
                          button
                          key={index}
                          title={listItem.listText}
                          data-toggle="tooltip"
                        >
                          <ListItemIcon className={classes.listItem}>
                            {listItem.listIcon}
                          </ListItemIcon>
                          <ListItemText primary={listItem.listText} />
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </>
              ) : (
                <>
                  <Link to="/pacra-wide">
                    <ListItem className={classes.listItem} button>
                      <ListItemIcon className={classes.listItem}>
                        <Home />
                      </ListItemIcon>
                      <ListItemText primary="PACRA" />
                    </ListItem>
                  </Link>
                  <Link to="/Reports">
                    <ListItem className={classes.listItem} button>
                      <ListItemIcon className={classes.listItem}>
                        <Assessment />
                      </ListItemIcon>
                      <ListItemText primary="Reports" />
                    </ListItem>
                  </Link>
                  <Link to="/PacVis">
                    <ListItem className={classes.listItem} button>
                      <ListItemIcon className={classes.listItem}>
                        <MenuBook />
                      </ListItemIcon>
                      <ListItemText primary="PACRA + VIS" />
                    </ListItem>
                  </Link>
                </>
              )}
            </List>
            {depName == 16 && (
              <>
                <Link to="/Research">
                  <ListItem className={classes.listItem} button>
                    <ListItemIcon className={classes.listItem}>
                      <Factory />
                    </ListItemIcon>
                    <ListItemText primary="Research" />
                  </ListItem>
                </Link>
              </>
            )}
            {depName == 4 && (
              <>
                <Link to="/Business">
                  <ListItem className={classes.listItem} button>
                    <ListItemIcon className={classes.listItem}>
                      <Business />
                    </ListItemIcon>
                    <ListItemText primary="BD Grid" />
                  </ListItem>
                </Link>
              </>
            )}
            {localStorage.getItem("username") === "Muhammad Hamza Saleem" && (
              <>
                <Link to="/Search">
                  <ListItem className={classes.listItem} button>
                    <ListItemIcon className={classes.listItem}>
                      <Search />
                    </ListItemIcon>
                    <ListItemText primary="Search All Opinions" />
                  </ListItem>
                </Link>
              </>
            )}
            {/* < Link to='/Search'>
                                    <ListItem className={classes.listItem} button >
                                        <ListItemIcon className={classes.listItem}>
                                            <Search />
                                        </ListItemIcon>
                                        <ListItemText primary='Search' />
                                    </ListItem>
                                </Link> 
                           */}
            {/* <Link to='/InputData'>
                                <ListItem className={classes.listItem} button >
                                    <ListItemIcon className={classes.listItem}>
                                        <ContactMail />
                                    </ListItemIcon>
                                    <ListItemText primary='Input Data' />
                                </ListItem>
                            </Link> */}
          </div>
        </List>
        <Divider />
        <ListItem
          className={`${classes.bottom} ${classes.listItem}`}
          onClick={signout}
          button
        >
          <ListItemIcon className={classes.listItem}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </Drawer>
    </div>
  );
}
