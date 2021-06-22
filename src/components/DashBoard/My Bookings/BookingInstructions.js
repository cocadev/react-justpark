import React, { Component } from "react";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CustomText from "../../Atom/CustomText";

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
  btn: {
    marginTop: 20,
    textTransform: 'none'
  }
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
    const { classes } = this.props;
    return (
      <div>
        <CustomText title="Access Instructions" type="title"/>
        <Typography variant="h7">{this.props.instructions}</Typography>
        <br></br>
        <Link
          to={{
            pathname: "/streetview",
            state: { lat: this.props.lat, long: this.props.long },
          }}
        >
          <Button
            className={classes.btn}
            variant='outlined'
            fullWidth
          >
            View Streetview
          </Button>
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
