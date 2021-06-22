import React, { Component } from "react";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import StarRatings from "react-star-ratings";
import firebase from "firebase";
import Modal from "@material-ui/core/Modal";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import moment from "moment";
import CustomText from "../../Atom/CustomText";

const styles = (theme) => ({
  root: {
    height: 300,
    flexGrow: 1,
    minWidth: 300,
    transform: "translateZ(0)",
    // The position fixed scoping doesn't work in IE 11.
    // Disable this demo to preserve the others.
    "@media all and (-ms-high-contrast: none)": {
      display: "none",
    },
  },
  modal: {
    display: "flex",
    padding: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

const db = firebase.database();

class BookingReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      rated: false,
      reviewKey: null,
    };

    this.changeRating = this.changeRating.bind(this);
  }

  mapBookingDetailsToState = (data) => {
    this.setState({
      data: data,
    });
  };

  componentDidMount() {
    const { data } = this.props;
    this.mapBookingDetailsToState(data);
  }

  handleChange = (event) => {
    db.ref(
      "Users/" +
        this.props.user.uid +
        "/driver_bookings/" +
        this.props.bookingKey
    ).update({
      review: event.target.value,
    });
  };

  changeRating(newRating, name) {
    const updates = {
      rating: newRating,
      user_reviewed: true,
    };

    console.log("here are the parameters");
    console.log(this.props.hostID);
    console.log(newRating);
    console.log(this.props.bookingKey);
    console.log(this.props.user.uid);
    console.log(this.props.userName);
    console.log("end");

    db.ref(
      "Users/" +
        this.props.user.uid +
        "/driver_bookings/" +
        this.props.bookingKey
    ).update(updates);

    console.log("this is the booking key");
    console.log(this.props.bookingKey);

    var reviewKey = db
      .ref("Spots/" + this.props.spotID + "/reviews_ratings")
      .push().key;
    db.ref("Spots/" + this.props.spotID + "/reviews_ratings/" + reviewKey).set({
      date: moment().format("YYYY-MM-DD hh:mm"),
      hostID: this.props.hostID,
      rating: newRating,

      bookingID: this.props.bookingKey,
      spotID: this.props.spotID,
      userID: this.props.user.uid,
      userName: this.props.userName,
    });

    this.setState({
      rating: newRating,
      rated: true,
      reviewKey: reviewKey,
    });

    // const { classes } = this.props;
  }

  submitReview = (e) => {
    e.preventDefault();
    let review = document.getElementById("review").value;
    db.ref(
      "Users/" +
        this.props.user.uid +
        "/driver_bookings/" +
        this.props.bookingKey
    ).update({
      review: review,
    });

    db.ref(
      "Spots/" + this.props.spotID + "/reviews_ratings/" + this.state.reviewKey
    ).update({
      review: review,
    });

    this.setState({
      rated: false,
    });
  };

  render() {
    const { classes } = this.props;
    console.log(this.state.rated);
    console.log("99999999");
    return (
      <div>
        {this.state.rated ? (
          <div>
            <br/>
            <Modal
              disablePortal
              disableEnforceFocus
              disableAutoFocus
              open
              aria-labelledby="server-modal-title"
              aria-describedby="server-modal-description"
              className={classes.modal}
            >
              <div className={classes.paper}>
                <h2 id="server-modal-title">How was your parking?</h2>

                <form noValidate onSubmit={this.submitReview}>
                  <TextField
                    id="review"
                    name="review"
                    type="text"
                    label="review"
                    fullWidth
                    onChange={this.onChangeHandler}
                  />

                  <Button type="submit">Submit</Button>
                </form>
              </div>
            </Modal>
          </div>
        ) : (
          <br></br>
        )}

        <CustomText title="How was your parking?" type="title" />

        <br></br>

        {!this.props.user_reviewed ? (
          <StarRatings
            starDimension="40px"
            starSpacing="15px"
            rating={this.state.rating}
            starRatedColor="gold"
            changeRating={this.changeRating}
            numberOfStars={5}
            name="rating"
          />
        ) : (
          <CustomText title="Thank you for your feedback" type="description" />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

BookingReview.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(BookingReview));
