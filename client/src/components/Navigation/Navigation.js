import React, { useState } from "react";
import { useAuth0 } from "../../react-auth0-spa";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListIcon from "@material-ui/icons/List";
import MenuIcon from "@material-ui/icons/Menu";
import MoodIcon from "@material-ui/icons/Mood";
import TodayIcon from "@material-ui/icons/Today";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Theme from "../shared/Theme/Theme";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: `${Theme.colors.white}`,
    borderBottom: `2px solid ${Theme.colors.first}`,
    boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36,
    color: `${Theme.colors.first}`
  },
  rightGroup: {
    marginLeft: "auto"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    backgroundColor: `${Theme.colors.white}`,
    [theme.breakpoints.down("sm")]: { display: "none" }
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    backgroundColor: `${Theme.colors.white}`,
    [theme.breakpoints.down("sm")]: { display: "flex" }
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: `${Theme.colors.white}`,
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    backgroundColor: `${Theme.colors.white}`,
    ...theme.mixins.toolbar
  },
  links: {
    textDecoration: "none",
    color: `${Theme.colors.white}`
  },
  active: {
    backgroundColor: `${Theme.colors.first}`,
    color: `${Theme.colors.white}`,
    "& > div": {
      "& > svg": { color: `${Theme.colors.white}` }
    },
    "&:hover": {
      backgroundColor: `${Theme.colors.fourth}`
    }
  }
}));

const Navigation = () => {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(null);

  const userMenuOpen = Boolean(userMenu);

  const handleUserMenu = event => {
    setUserMenu(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenu(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="transparent"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
        data-testid="navigation"
      >
        <Toolbar>
          {isAuthenticated && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              data-testid="side-menu-button"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open
              })}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" noWrap className={classes.title}>
            TAP
          </Typography>

          {!isAuthenticated && (
            /* istanbul ignore next */
            <div className={classes.rightGroup}>
              <Button
                data-testid="login-button"
                color="inherit"
                onClick={() => loginWithRedirect({})}
              >
                <ExitToAppIcon />
                LOGIN / REGISTER
              </Button>
            </div>
          )}

          {isAuthenticated && (
            <div className={classes.rightGroup}>
              <IconButton
                aria-label="current user account"
                data-testid={"user-menu"}
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleUserMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                data-testid="right-user-menu"
                anchorEl={userMenu}
                anchorOrigin={{ vertical: "left", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "left", horizontal: "right" }}
                open={userMenuOpen}
                onClose={handleUserMenuClose}
              >
                <NavLink
                  to="/account"
                  style={{
                    textDecoration: "none",
                    color: `${Theme.colors.black}`
                  }}
                >
                  <MenuItem
                    onClick={handleUserMenuClose}
                    data-testid="my-account-button"
                  >
                    My Account
                  </MenuItem>
                </NavLink>
                <MenuItem data-testid="logout-button" onClick={() => logout()}>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {isAuthenticated && (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
        >
          <div className={classes.toolbar}>
            <IconButton
              onClick={handleDrawerClose}
              data-testid="close-side-menu"
            >
              {open === false ? null : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List data-testid="navigation-links">
            <ListItem
              button
              data-testid="today-link"
              component={NavLink}
              to="/home"
              activeClassName={classes.active}
              key="Today"
              onClick={handleDrawerClose}
            >
              <ListItemIcon>
                <TodayIcon />
              </ListItemIcon>
              <ListItemText primary="Today" />
            </ListItem>

            <ListItem
              button
              component={NavLink}
              to="/tasks/all"
              activeClassName={classes.active}
              key="All Tasks"
              onClick={handleDrawerClose}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="All Tasks" />
            </ListItem>

            <ListItem
              button
              component={NavLink}
              to="/tasks/add"
              activeClassName={classes.active}
              key="Add a Task"
              onClick={handleDrawerClose}
            >
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Add a Task" />
            </ListItem>

            <ListItem
              button
              component={NavLink}
              to="/tasks/moodist"
              activeClassName={classes.active}
              key="Moodist"
              onClick={handleDrawerClose}
            >
              <ListItemIcon>
                <MoodIcon />
              </ListItemIcon>
              <ListItemText primary="Moodist" />
            </ListItem>

            <ListItem
              button
              component={NavLink}
              to="/tasks/summary"
              activeClassName={classes.active}
              key="Summary"
              onClick={handleDrawerClose}
            >
              <ListItemIcon>
                <DonutLargeIcon />
              </ListItemIcon>
              <ListItemText primary="Summary" />
            </ListItem>

            <ListItem
              button
              component={NavLink}
              to="/faq"
              activeClassName={classes.active}
              key="FAQ"
              onClick={handleDrawerClose}
            >
              <ListItemIcon>
                <HelpOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="FAQ" />
            </ListItem>
          </List>
        </Drawer>
      )}
    </>
  );
};

export default Navigation;
