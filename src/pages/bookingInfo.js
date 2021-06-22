import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import BookingDetails from "../components/DashBoard/My Bookings/BookingDetails";
import BookingInstructions from "../components/DashBoard/My Bookings/BookingInstructions";
import BookingReview from "../components/DashBoard/My Bookings/BookingReview";
import firebase from "firebase";
import SideBar from "../components/DashBoard/SideBar/SideBar";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Container, Card } from "@material-ui/core";
import CustomText from "../components/Atom/CustomText";

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
  },
  card: {
    padding: 25
  }
});

class bookingInfo extends Component {
  state = {
    data: [],
    instructions: "",
    address: "",
    listinsName: "",
    rating: "",
    streetName: "",
    totalPrice: "",
    startTime: "",
    endTime: "",
    bookingKey: "",
    long: "",
    lat: "",
    hostID: "",
    userName: "",
    user_reviewed: "",
    spotID: "",
  };

  mapBookingDetailsToState = (data) => {
    const { foo } = this.props.location.state;

    console.log(foo); // "bar"
    let spot = this;

    var userName = "";

    // var name = firebase
    //   .database()
    //   .ref(`Users/${this.props.user.uid}`)
    //   .on("value", (snapshot) => {
    //     userName = snapshot.child("firstName").val();
    //   });

    var query = firebase
      .database()
      .ref(`Users/${this.props.user.uid}/driver_bookings`)
      .orderByKey();
    query.on("value", function (snapshot) {
      var instructions = "";
      var address = "";
      var listinsName = "";
      var rating = "";
      var streetName = "";
      var totalPrice = "";
      var startTime = "";
      var endTime = "";
      var bookingKey = "";
      var long = "";
      var lat = "";
      var hostID = "";
      var user_reviewed = "";
      var spotID = "";

      snapshot.forEach(function (childSnapshot) {
        // gets vehicle unique id
        var key = childSnapshot.key;

        if (key == foo) {
          instructions = childSnapshot.child("instructions").val();
          address = childSnapshot.child("address").val();
          listinsName = childSnapshot.child("listinsName").val();
          rating = childSnapshot.child("rating").val();
          streetName = childSnapshot.child("streetName").val();
          totalPrice = childSnapshot.child("totalPrice").val();
          startTime = childSnapshot.child("startTime").val();
          endTime = childSnapshot.child("endTime").val();
          bookingKey = foo;
          long = childSnapshot.child("long").val();
          lat = childSnapshot.child("lat").val();
          hostID = childSnapshot.child("hostID").val();
          spotID = childSnapshot.child("spotID").val();

          if (childSnapshot.child("user_reviewed").val() == null) {
            user_reviewed = false;
          } else if (childSnapshot.child("user_reviewed").val() == true) {
            user_reviewed = true;
          }
        }
      });

      //set state to vehiclePlates to re-render
      spot.setState({
        data: data,
        instructions: instructions,
        address: address,
        listinsName: listinsName,
        rating: rating,
        streetName: streetName,
        totalPrice: totalPrice,
        startTime: startTime,
        endTime: endTime,
        bookingKey: bookingKey,
        long: long,
        lat: lat,
        hostID: hostID,
        userName: userName,
        user_reviewed: user_reviewed,
        spotID: spotID,
      });
    });
  };

  componentDidMount() {
    const { data } = this.props;
    this.mapBookingDetailsToState(data);
  }

  render() {
    console.log("rerererere");
    console.log(this.state.rating);
    const { classes } = this.props;

    // var keys = "-MO4Bl2xLa3u0FT9C9zc";
    return (
      <div className={classes.container}>
        <SideBar />
        <Container maxWidth="lg" style={{ marginTop: 40 }}>
          <Grid container spacing={3} alignContent="center">
            <Grid item sm={5} xs={12}>
              <Card className={classes.card}>
                <BookingDetails
                  address={this.state.address}
                  listinsName={this.state.listinsName}
                  streetName={this.state.streetName}
                  totalPrice={this.state.totalPrice}
                  startTime={this.state.startTime}
                  endTime={this.state.endTime}
                  bookingKey={this.state.bookingKey}
                  user_reviewed={this.state.user_reviewed}
                  rating={this.state.rating}
                />
              </Card>
              <Card className={classes.card} style={{ marginTop: 25 }}>
                <BookingReview
                  bookingKey={this.state.bookingKey}
                  hostID={this.state.hostID}
                  userName={this.state.userName}
                  user_reviewed={this.state.user_reviewed}
                  rating={this.state.rating}
                  spotID={this.state.spotID}
                />
              </Card>
            </Grid>
            <Grid item sm={7} xs={12}>
              <Card className={classes.card}>
                <BookingInstructions
                  instructions={this.state.instructions}
                  long={this.state.long}
                  lat={this.state.lat}
                />
              </Card>

              <Card style={{ marginTop: 25, marginBottom: 20, padding: '45px 35px' }}>
                <CustomText title="Payments and receipts" type="title" />
              </Card>

            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

bookingInfo.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(bookingInfo));
