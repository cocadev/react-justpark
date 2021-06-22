import React, { Component } from "react";

import BookingItem from "./BookingItem";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { setBookings } from "../../../redux/actions/bookingActions";

import firebase from "firebase";
import BookingNotFound from "./BookingNotFound";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  phoneNumGrid: {
    top: "20px",
  },
  containerRoot: {
    background: "white",
  },
  title: {
    //textDecoration: "underline",
    marginTop: 30,
  },
});

class Past extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookings: [],
    };
  }

  getTimeComponents(time) {
    var year = time.split("-")[0];
    var month = time.split("-")[1];
    var day = time.split("-")[2];
    day = day.split(" ")[0];
    var hour = time.split(" ")[1];
    hour = hour.split(":")[0];
    var min = time.split(" ")[1];
    min = min.split(":")[1];

    //var d = new Date("2015-03-25T12:00:00Z");
    var d = new Date(
      year + "-" + month + "-" + day + "T" + hour + ":" + min + ":00Z"
    );

    return d;
  }

  async getBookings(n) {
    //this function retrieves all the vehicles within the users vehicle node
    let time = this;
    if (this.props.bookings) {
      console.log("there are bookings in props!!!");
    }
    console.log("wewewewe");

    var query = firebase
      .database()
      .ref(`Users/${this.props.user.uid}/driver_bookings`)
      .orderByKey();
    query.on("value", function (snapshot) {
      var bookingsArray = [];

      snapshot.forEach(function (childSnapshot) {
        // gets vehicle unique id

        // gets vehicle license plate
        var start = time.getTimeComponents(childSnapshot.child("date").val());
        var end = time.getTimeComponents(childSnapshot.child("endTime").val());
        var current = new Date();
        //var current = new Date().toISOString();

        console.log("lalalalalala");
        console.log("start: " + start);
        console.log("end: " + end);
        //console.log("current: " + current);

        var key = childSnapshot.key;

        // gets vehicle license plate
        var address = childSnapshot.child("address").val();
        var displayEndTime = childSnapshot.child("displayEndTime").val();
        var displayStartTime = childSnapshot.child("displayStartTime").val();
        var listingName = childSnapshot.child("listingName").val();
        var price = childSnapshot.child("totalPrice").val();

        var formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });

        price = formatter.format(price);

        if (
          current.getTime() > start.getTime() &&
          current.getTime() > end.getTime()
        ) {
          bookingsArray.push([
            key,
            address,
            displayEndTime,
            displayStartTime,
            listingName,
            price,
          ]);
        }

        //pushes both to plates array
      });

      //set state to vehiclePlates to re-render
      time.setState({
        bookings: bookingsArray,
      });
      time.props.setBookings(bookingsArray);
    });
  }

  componentDidMount() {
    this.getBookings(0);
  }

  render() {

    console.log("hahahhahah");
    console.log(this.state.bookings);
    const { bookings } = this.state;

    return (
      <List>
        {bookings.map((item) => {
          return (
            <ListItem>
              <BookingItem
                listingName={item[4]}
                address={item[1]}
                displayEndTime={item[2]}
                displayStartTime={item[3]}
                bookingKey={item[0]}
                price={item[5]}
              />
            </ListItem>
          );
        })}
        {
          bookings.length === 0 &&
          <BookingNotFound title="Past" />
        }
      </List>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  bookings: state.booking,
});

const mapActionsToProps = {
  setBookings,
};

Past.propTypes = {
  bookings: PropTypes.object.isRequired,
  setBookings: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Past));
