import React, { Component } from "react";
import PropTypes from "prop-types";

//MUI
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import { Link } from "react-router-dom";

//Redux
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";

class MenuOptions extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    return (
      <div>
        <ListItem button component={Link} to="/dashboard/profile">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/bookings">
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Bookings Made" />
        </ListItem>
        <ListItem button onClick={this.handleLogout} component={Link} to="/">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser };

MenuOptions.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(MenuOptions);
