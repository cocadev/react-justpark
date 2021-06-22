import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setSpaceData } from "../../redux/actions/dataActions";

import SpotTripInfo from "./SpotTripInfo";
import CloseIcon from '@material-ui/icons/Close';

class ConfirmationPrompt extends React.Component {
  constructor(props) {
    super(props);

    console.log(`props into confirmation prompt`);
    console.log(props);
    this.state = {
      userId: props.userId,
      spotId: props.spotId,
      timeDelta: props.timeDelta,
      price: props.price,
      spot: props.spot,
      startDate: props.startDate,
      endDate: props.endDate,
    };
  }

  displayHumanReadableDate(date) {
    let hours = date.getHours();
    let pm = "AM";
    if (hours >= 12) {
      pm = "PM";
      hours = hours - 12;
    }
    return `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}  ${hours}:${date.getMinutes()} ${pm}`;
  }

  handleConfirm = (event) => {
    this.props.setSpaceData(this.props, this.props.history);
  };

  render() {
    return (
      <div
        id="confirmationPrompt"
        style={{
          backgroundColor: "#fff",
          borderRadius: 4,
          margin: 10,
          padding: 12,
          marginTop: -40,
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Grid container style={{ padding: "1%" }}>
              <Grid item xs={5}></Grid>
              {/*<Grid item xs={7}>
                {this.state.spot.street_number} {this.state.spot.street_name}
      </Grid>*/}
      <CloseIcon style={{ position: 'absolute', top: 18, right: 18}} onClick={() => {
                this.props.cancelCallback();
              }}/>
              <Grid item xs={5}></Grid>
              <Grid item xs={12}>
                <Typography align="center">
                  {this.state.spot.spot_name}
                </Typography>
                <Typography align="center">
                  {this.state.spot.city} {this.state.spot.state}
                  {", "}
                  {this.state.spot.postal_code}
                </Typography>
              </Grid>
            </Grid>
            <SpotTripInfo
              price={Number.parseFloat(this.state.price).toPrecision(4)}
            ></SpotTripInfo>
          </Grid>
          <Grid item xs={5}>
            <p style={{ textAlign: "right", marginRight: "2ch" }}>
              Total price
            </p>
          </Grid>
          <Grid item xs={7}>
            <p>${Number.parseFloat(this.state.price).toPrecision(4)}</p>
          </Grid>
          <Grid item xs={5}>
            <p style={{ textAlign: "right", marginRight: "2ch" }}>Start Date</p>
          </Grid>
          <Grid item xs={7}>
            <p>{this.displayHumanReadableDate(this.state.startDate)}</p>
          </Grid>
          <Grid item xs={5}>
            <p style={{ textAlign: "right", marginRight: "2ch" }}>End Date</p>
          </Grid>
          <Grid item xs={7}>
            <p>{this.displayHumanReadableDate(this.state.endDate)}</p>
          </Grid>
            <Button
              style={{ width: "100%", marginLeft: "auto" }}
              variant="contained"
              color="primary"
              onClick={this.handleConfirm}
            >
              Confirm Selection
            </Button>
      
        </Grid>
      </div>
    );
  }
}

ConfirmationPrompt.propTypes = {
  setSpaceData: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  setSpaceData,
};

const mapStateToProps = (state) => ({
  listing: state.listing,
});

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(ConfirmationPrompt)
);
