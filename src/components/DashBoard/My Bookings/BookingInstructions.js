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
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

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
  field: {
    marginTop: 10,
    //marginBottom: 20,
    display: "block",
  },
});

class BookingInstructions extends Component {
  state = {
    user: [],
  };

  mapBookingDetailsToState = (user) => {
    this.setState({
      user: user,
    });
  };

  componentDidMount() {
    const { user } = this.props;
    this.mapBookingDetailsToState(user);
  }

  render() {
    // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions

    return (
      <div>
        <Typography variant="h6">Access Instructions</Typography>
        <Typography variant="h7">{this.props.instructions}</Typography>
        <br></br>
        <Link
          to={{
            pathname: "/streetview",
            state: { lat: this.props.lat, long: this.props.long },
          }}
        >
          <Button>View Streetview</Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

BookingInstructions.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(
  withStyles(styles)(BookingInstructions)
);
