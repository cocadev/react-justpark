import React, { Component } from "react";
import BookingSummary from "../components/Checkout/BookingSummary";
import { Grid, Paper, Container, Typography, Card } from "@material-ui/core/";

import CheckoutPersonalDetails from "./checkoutPersonalDetails";
import CheckoutPaymentInfo from "./checkoutPaymentInfo";
import CheckoutPaymentButton from "../components/Checkout/CheckoutPaymentButton";
import FirebaseUI from "../components/Auth/FirebaseUI";
import firebase from "firebase";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setUserData } from "../redux/actions/userActions";
import CustomText from "../components/Atom/CustomText";

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
      <Container maxWidth="lg" style={{ marginTop: 40 }}>
        <Grid container spacing={3} alignContent="center" st>
          <Grid item sm={5}>
            <BookingSummary />
          </Grid>
          <Grid item sm={7}>
            {isAuthenticated ? (
              <CheckoutPersonalDetails />
            ) : (
              <FirebaseUI />
            )}

            <Card style={{ marginTop: 25, marginBottom: 20, padding: '45px 35px' }}>
              <CustomText title="2. Payment Information" type="title" />
              <CheckoutPaymentInfo key={this.state.firstName} />
            </Card>

            <CheckoutPaymentButton />
          </Grid>
        </Grid>
      </Container>
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
