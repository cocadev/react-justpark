import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button, Popover, MenuList, MenuItem, ClickAwayListener, withStyles } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { logoutUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  menuDropDown: {
    padding: 15,
    borderRadius: 4,
    color: "#999",
    filter: "drop-shadow(0 1px 1px rgba(41,48,56,.2))",
    width: 240,
    overflow: "visible",
    "&:after": {
      content: "''",
      position: "absolute",
      width: 0,
      top: -8,
      left: "100%",
      marginLeft: -45,
      height: 0,
      borderLeft: "8px solid transparent",
      borderRight: "8px solid transparent",
      borderBottom: "8px solid #fff",
      filter: "drop-shadow(0 -1px 1px rgba(41,48,56,.1))",
    }
  }
});

class ProfileNavbarButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  }

  render() {
    const handleClick = (event) => {
      this.setState({ anchorEl: event.currentTarget });
    };

    const handleClose = () => {
      this.setState({ anchorEl: null });
    };

    const handleLogout = () => {
      this.setState({ anchorEl: null });
  
      this.props.logoutUser();
    };

    const { classes } = this.props;

    return (
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          color="primary"
          onClick={handleClick}
          endIcon={<ExpandMoreIcon />}
        >
          {this.props.userName}
        </Button>
        <Popover
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{ variant: "outlined", className: classes.menuDropDown }}
          style={{ top: "30px" }}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem={Boolean(this.state.anchorEl)} id="menu-list-grow">
              <MenuItem component={Link} to="/dashboard/profile" onClick={handleClose}>
                My Profile
              </MenuItem>
              <MenuItem component={Link} to="/dashboard/bookings" onClick={handleClose}>
                Booking History
              </MenuItem>
              <MenuItem component={Link} to="/" onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Popover>
      </div>
    );
  }
}

ProfileNavbarButton.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ProfileNavbarButton));
