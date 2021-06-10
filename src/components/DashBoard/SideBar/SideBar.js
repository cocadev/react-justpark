import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//MUI
import { Drawer, List, ListItem, ListItemIcon, ListItemText, withStyles } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { logoutUser } from "../../../redux/actions/userActions";

const styles = (theme) => ({
  drawerPaper: {
    position: "static",
    minWidth: theme.layout.sidebar.width,
    background: "#eff4f4",
    top: "60px",
    borderRight: "none",
  },
  drawer: {
    width: theme.layout.sidebar.width,
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  drawerContainer: {
    overflow: "auto",
  },
});

class SideBar extends Component {
  render() {
    const { classes, logoutUser } = this.props;

    return (
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          <ListItem button component={Link} to="/dashboard/profile">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText secondary="My Profile" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/bookings">
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText secondary="Bookings Made" />
          </ListItem>
          <ListItem button component={Link} to="/" onClick={logoutUser}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText secondary="Log Out" />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

SideBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapActionsToProps = { logoutUser };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SideBar));
