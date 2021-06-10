import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Hidden,
  withStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import ProfileNavbarButton from "./ProfileNavbarButton";
import logo from "../images/logo.png";

import { logoutUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  appBar: {
    width: "100vw",
    height: theme.layout.header.height,
    zIndex: "10",
    background: "#ffffff",
    boxShadow: "0 2px 4px rgb(0 0 0 / 20%)",
    top: 0,
    padding: "0 10px",
    justifyContent: "center",
  },
  toolBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
    padding: "0 20px 0 0",
    position: "relative",
  },
  logo: {
    width: "93px",
    height: "36px",
    padding: "0 15px",
    color: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  menuList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#999999",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  menuButton: {
    margin: "0 5px",
    fontWeight: "400",
    textTransform: "unset",
    lineHeight: "21.75px",
    paddingTop: "8px",
    paddingBottom: "8px",
  },
  burgerMenuButton: {
    position: "absolute",
    left: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    width: "2.5rem",
    padding: "0.5rem",
    color: theme.palette.primary.main,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: theme.layout.sidebar.mobileWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: theme.layout.sidebar.mobileWidth,
  },
  listItemIcon: {},
});

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileOpen: false,
    };
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleMenuToggle() {
    const { mobileOpen } = this.state;
    this.setState({ mobileOpen: !mobileOpen });
  }

  handleLogout() {
    this.handleMenuToggle();
    this.props.logoutUser();
  }

  render() {
    const { mobileOpen } = this.state;
    const { classes } = this.props;
    const isAuthenticated = this.props.user.authenticated;
    const userName = this.props.user.firstName;

    const burgerMenu = (
      <List>
        <ListItem>
          <img className={classes.logo} src={logo} alt="Prked Logo" />
        </ListItem>
        {!isAuthenticated && (
          <>
            <ListItem
              button
              component="a"
              href="https://prked.zendesk.com/hc/en-us"
            >
              <ListItemIcon className={classes.listItemIcon}>
                <HelpOutlineIcon />
              </ListItemIcon>
              <ListItemText>Help</ListItemText>
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/auth/login"
              onClick={this.handleMenuToggle}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <LockOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Login</ListItemText>
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/registration"
              onClick={this.handleMenuToggle}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <LockOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Sign Up</ListItemText>
            </ListItem>
          </>
        )}
        {isAuthenticated && (
          <>
            <ListItem
              button
              component={Link}
              to="/dashboard/profile"
              onClick={this.handleMenuToggle}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText>My Profile</ListItemText>
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/dashboard/bookings"
              onClick={this.handleMenuToggle}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText>Bookings Made</ListItemText>
            </ListItem>

            <ListItem
              button
              component="a"
              href="https://prked.zendesk.com/hc/en-us"
            >
              <ListItemIcon className={classes.listItemIcon}>
                <HelpOutlineIcon />
              </ListItemIcon>
              <ListItemText>Help</ListItemText>
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/"
              onClick={this.handleLogout}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText>Log Out</ListItemText>
            </ListItem>
          </>
        )}
      </List>
    );

    const container = document !== undefined ? () => document.body : undefined;

    return (
      <>
        <AppBar className={classes.appBar} position="sticky">
          <Toolbar className={classes.toolBar}>
            <IconButton
              className={classes.burgerMenuButton}
              edge="start"
              aria-label="menu"
              onClick={this.handleMenuToggle}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/">
              <img className={classes.logo} src={logo} alt="Prked Logo" />
            </Link>
            <div className={classes.menuList}>
              <Button
                color="inherit"
                className={classes.menuButton}
                component={Link}
                to="/"
              >
                Home
              </Button>
              <Button
                color="inherit"
                className={classes.menuButton}
                target="_blank"
                href="https://prked.zendesk.com/hc/en-us"
              >
                Help
              </Button>

              {!isAuthenticated && (
                <Button
                  color="primary"
                  className={classes.menuButton}
                  component={Link}
                  to="/auth/login"
                >
                  Login
                </Button>
              )}
              {!isAuthenticated && (
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.menuButton}
                  style={{ borderRadius: "19px" }}
                  component={Link}
                  to="/registration"
                >
                  Sign up
                </Button>
              )}
              {isAuthenticated && (
                <ProfileNavbarButton userName={userName}></ProfileNavbarButton>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden mdUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={this.handleMenuToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {burgerMenu}
            </Drawer>
          </Hidden>
        </nav>
      </>
    );
  }
}

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Navbar));
