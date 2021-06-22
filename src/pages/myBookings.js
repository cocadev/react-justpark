import React, { Component } from "react";

import MyBookings from "../components/DashBoard/My Bookings/MyBookings";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import firebase from "firebase";

var userId;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    userId = firebase.auth().currentUser.uid;
  } else {
    userId = "0";
  }
});

const styles = () => ({});

class myBookings extends Component {
  /*constructor() {
    super();
    this.state = {
      user: {},
    };
  }*/
  mapUserDetailsToState = (user) => {
    this.setState({
      email: user.email ? user.email : "",
      phoneNumber: user.phoneNumber ? user.phoneNumber : "",
    });
  };

  componentDidMount() {
    const { user } = this.props;
    this.mapUserDetailsToState(user);
  }
  render() {
    console.log(userId);
    return (
      <Container>
        <MyBookings userId={userId} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

// const mapActionsToProps = { logoutUser, uploadImage };

myBookings.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(myBookings));
