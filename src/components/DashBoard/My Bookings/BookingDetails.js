import React, { Component } from "react";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { isIOS } from "react-device-detect";

class BookingDetails extends Component {
  state = {
    data: [],
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

  render() {
    return (
      <div>
        <Typography variant="h6">{this.props.address}</Typography>
        <br></br>
        <Typography variant="h7">
          Booking Ref: {this.props.bookingKey}
        </Typography>
        <br></br>
        {!this.props.user_reviewed ? (
          <Typography variant="h7">lll</Typography>
        ) : (
          <Typography variant="h7">You rated: {this.props.rating}</Typography>
        )}
        <br></br>
        <Typography variant="h7">From {this.props.startTime}</Typography>
        <br></br>
        <Typography variant="h7">To {this.props.endTime}</Typography>
        <br></br>

        {!isIOS ? (
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              window.location.href =
                "http://maps.google.com/maps?saddr=My+Location&daddr=36.110772312588075,-80.34486301839996";
            }}
          >
            {" "}
            Get Directions
          </Button>
        ) : (
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              window.location.href =
                "http://maps.apple.com/?saddr=Current&daddr=36.110772312588075,-80.34486301839996&amp;ll=";
            }}
          >
            {" "}
            Get Directions
          </Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

BookingDetails.propTypes = {
  data: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(BookingDetails);
