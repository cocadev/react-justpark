import React, { Component } from "react";

import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import firebase from "firebase";

import { Redirect } from "react-router-dom";

import Moment from "moment";

class CheckoutPaymentButton extends Component {
  /*constructor(props) {
    super(props);
    console.log("props into checkout button");
    console.log(props);
    this.state = {
      paymentMethod: props.paymentMethod,
      customerID: props.customerID,
      email: props.email,
    };
  }*/

  state = {
    data: [],
    redirect: null,
    newBookingKey: null,
  };

  mapBookingDetailsToState = (data) => {
    this.setState({
      data: data,
    });
  };

  componentDidMount() {
    const { data } = this.props;
    this.mapBookingDetailsToState(data);
  }

  //TODO: replace hard coded user info with actual info from props/redux. Same with price
  payAction() {
    let redirect = this;
    var hostRef = firebase
      .database()
      .ref("Users/" + this.state.data.spot.owners_uid);

    var data = this.state.data;
    var customerID;
    var pmID;
    var user = this.props.user;
    var address = data.spot.street_number + " " + data.spot.street_name;
    let duration = data.timeDelta / 60000;
    let roundedDuration = Math.trunc(duration);

    var driverRef = firebase.database().ref("Users/" + user.uid);

    var startTime2 = Moment(data.startDate).format("YYYY-MM-DD HH:mm");
    var realEndTime = Moment(data.endDate).format("YYYY-MM-DD HH:mm");
    var displayStartTime = Moment(data.startDate).format("MMM DD, h:mm A");
    var displayEndTime = Moment(data.endDate).format("MMM DD, h:mm A");
    var roundedPrice = Number.parseFloat(data.price).toFixed(2);
    var priceString = "$" + roundedPrice.toString();

    const bookingData = {
      address: address,
      date: startTime2, //Fix all dates
      displayEndTime: displayEndTime, //
      displayStartTime: displayStartTime, //
      duration: roundedDuration, //may need to turn back into seconds for DB
      endTime: realEndTime, //
      hostID: data.spot.owners_uid,
      instructions: data.spot.instructions,
      lat: data.spot.streetview_lat,
      long: data.spot.streetview_long,
      rating: 4, //Figure out rating system on web
      resID: "",
      review: "",
      spotID: data.spot.spotId,
      startTime: startTime2, //
      streetName: data.spot.street_name,
      totalPrice: roundedPrice, //may need to be a string to be same as ios
      unseen: "",
      userID: user.uid,
      vehicleColor: "", // might not need any vehicle info except plate number
      vehicleMake: "",
      vehicleModel: "",
      vehiclePlate: "clwn78",
    };

    driverRef
      .child("stripe")
      .child("paymentMethods")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          customerID = snapshot.child("stripeCustomerID").val();
          pmID = snapshot.child("isDefault").val(); //need to find better way to get payment method that user chose at checkout

          console.log(`customerID is ${customerID} and pmID is ${pmID}`);

          hostRef
            .get()
            .then(function (snapshot) {
              if (snapshot.exists()) {
                console.log(snapshot.val());
                var hostConnectID = snapshot
                  .child("hostConnectAccountID")
                  .val();

                var chargeCustomer = firebase
                  .functions()
                  .httpsCallable("chargeCustomer");

                //var priceString = data.price.toString();
                //var priceParam = money.concat(priceString);
                //console.log(priceParam);
                var bookingKey = driverRef.push().key;
                chargeCustomer({
                  amount: priceString, //Need real price here but as a string not float
                  paymentMethod: pmID, //need to fix this
                  customerID: customerID, // and this
                  email: user.email,
                  resId: bookingKey,
                  hostConnectAccountID: hostConnectID,
                  spotId: data.spotId,
                  own: data.spot.owners_uid,
                  start: startTime2,
                  end: realEndTime,
                })
                  .then(function (result) {
                    // Read result of the Cloud Function.
                    //var sanitizedMessage = result.data.text;
                    console.log(result);

                    //Payment was a success

                    bookingData.resID = bookingKey;
                    driverRef
                      .child("driver_bookings")
                      .child(bookingKey)
                      .set(bookingData);
                    hostRef
                      .child("host_bookings")
                      .child(bookingKey)
                      .set(bookingData);

                    redirect.setState({
                      redirect: "/bookinginfo",
                      newBookingKey: bookingKey,
                    });

                    console.log("it redirects");
                    console.log(this.state.redirect);
                    console.log(this.state.newBookingKey);
                  })
                  .catch((error) => {
                    // Getting the Error details.
                    console.log(error);
                    // ...
                  });
              } else {
                console.log("No data available");
              }
            })
            .catch(function (error) {
              console.error(error);
            });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handlePayAction = (event) => {
    this.payAction();
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: { foo: this.state.newBookingKey },
          }}
        />
      );
    }
    return (
      <div style={{marginTop: 12}}>
        <Button variant="contained" color='primary' fullWidth onClick={this.handlePayAction}>
          {" "}
          Confirm and Pay
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

CheckoutPaymentButton.propTypes = {
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(CheckoutPaymentButton);
