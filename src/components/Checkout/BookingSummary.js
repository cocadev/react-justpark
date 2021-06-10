import React, { Component } from "react";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CalenderSelector from "../Map/Search bar/CalendarSelector";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

// We can inject some CSS into the DOM.
const styles = {
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  typoGray: {
    color: "#A9A9A9",
  },
  paper: {
    background: "#F8F8F8",
  },
  typoBold: {
    fontWeight: "bold",
  },
};

class BookingSummary extends Component {
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

  getDuration(timeDelta) {
    let duration = timeDelta / 3600000;
    let rounded = Number.parseFloat(duration.toFixed(1));
    return rounded;
  }

  duration = this.state.data.timeDelta;
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper>
          <Grid container alignItems="center">
            <Grid item md={5}>
              <CalenderSelector
                start={true}
                selectedTime={this.state.data.startDate}
              />
            </Grid>
            <Grid item md={2}>
              <Typography> --- </Typography>
            </Grid>
            <Grid item md={5}>
              <CalenderSelector
                start={false}
                selectedTime={this.state.data.endDate}
              />
            </Grid>
          </Grid>
          <Paper className={classes.paper}>
            <Typography align="center">
              {`${this.getDuration(this.state.data.timeDelta)}h`}
            </Typography>
            <Typography align="center">Total Duration</Typography>
          </Paper>
          <Paper>
            <Typography align="right">{`Final Price: $${this.state.data.price} `}</Typography>
          </Paper>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

BookingSummary.propTypes = {
  data: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(BookingSummary));
