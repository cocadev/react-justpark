import React, { Component } from "react";
import BookingSummary from "../components/Checkout/BookingSummary";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import CheckoutPersonalDetails from "./checkoutPersonalDetails";
import CheckoutPaymentInfo from "./checkoutPaymentInfo";
import CheckoutPaymentButton from "../components/Checkout/CheckoutPaymentButton";
import FirebaseUI from "../components/Auth/FirebaseUI";

import { Typography } from "@material-ui/core";
import firebase from "firebase";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setUserData } from "../redux/actions/userActions";

firebase.auth().onAuthStateChanged(function (user) {
  //window.location.reload();
});

//TODO: Handle state change of checkout button (disabled/enabled) depending on payment methods and user info
//Link user to some sort of recipt/confirmation page. Follow Justpark booking video
//Design all components and main checkout page
class checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.user.email,
      phoneNumber: this.props.user.phoneNumber,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
    };
  }

  mapUserDetailsToState = (user) => {
    let userRef = this;

    if (user.firstName == "") {
      var newRef = firebase.database().ref("Users/" + user.uid);

      newRef.on("value", function (snapshot) {
        let userData = {
          email: snapshot.val().email,
          phoneNumber: snapshot.val().phoneNumber,
          firstName: snapshot.val().firstName,
          lastName: snapshot.val().lastName,
          uid: snapshot.val().id,
        };
        userRef.setState({
          email: snapshot.val().email,
          phoneNumber: snapshot.val().phoneNumber,
          firstName: snapshot.val().firstName,
          lastName: snapshot.val().lastName,
        });

        userRef.props.setUserData(userData);
      });
    }

    /*this.setState({
      email: user.email ? user.email : "",
      phoneNumber: user.phoneNumber ? user.phoneNumber : "",
      displayName: user.displayName ? user.displayName : "",
      firstName: user.firstName ? user.firstName : "",
      lastName: user.lastName ? user.lastName : "",
      uid: user.uid ? user.uid : "",
    });*/
  };

  componentDidMount() {
    const { user } = this.props;
    this.mapUserDetailsToState(user);
  }
  render() {
    const isAuthenticated = this.props.user.authenticated;
    this.mapUserDetailsToState(this.props.user);
    return (
      <div>
        <Grid container spacing={5} alignContent="center">
          <Grid item sm={5}>
            <BookingSummary />
          </Grid>
          <Grid item sm={5}>
            <Grid container>
              <Paper>
                <Grid item sm={12}>
                  {isAuthenticated ? (
                    <CheckoutPersonalDetails />
                  ) : (
                    <FirebaseUI />
                  )}
                </Grid>
                <Grid item sm={12}>
                  <Typography>2. Payment Information</Typography>
                </Grid>
                <Grid item sm={12}>
                  <CheckoutPaymentInfo key={this.state.firstName} />
                </Grid>
                <Grid item sm={12}>
                  <CheckoutPaymentButton />
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = {
  setUserData,
};

checkout.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(checkout);
