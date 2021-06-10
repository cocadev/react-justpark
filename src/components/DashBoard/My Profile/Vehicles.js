import React, { Component } from "react";
import { Link } from "react-router-dom";

//Redux
import { connect } from "react-redux";

//MUI
import { Grid, Container, Typography, Button, withStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import firebase from "firebase";

var userId;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    userId = firebase.auth().currentUser.uid;
  } else {
    userId = "0";
  }
});

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
    margin: "30px 0 20px",
  },
  addButton: {
    padding: "20px 0",
    border: "1px dashed #cdd3db",
    borderRadius: "0",
    background: "#f8f9fb"
  }
});

class Vehicles extends Component {
  state = {
    currentVehicle: "",
  };
  mapUserDetailsToState = (user) => {
    let car = this;
    var newRef = firebase
      .database()
      .ref("Users/" + userId + "/vehicles/main/value/");

    newRef.on("value", function (snapshot) {
      car.setState({
        currentVehicle: snapshot.val(),
      });
    });
  };

  componentDidMount() {
    const { user } = this.props;
    this.mapUserDetailsToState(user);
  }

  render() {
    const { classes } = this.props;

    return (
      <Container>
        <Typography className={classes.title} variant="h5">
          Vehicles
        </Typography>

        <Typography variant="h7" color="textSecondary">Your most recently used vehicle is listed below. To add more, or view all your vehicles, please click the "View more details" link.</Typography>
        
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h7">
              Current Vehicle: {this.state.currentVehicle}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Button
              fullWidth
              variant="outlined"
              to="/vehicles"
              component={Link}
              onClick={this.handleSubmit}
              startIcon={<AddIcon />}
              className={classes.addButton}
            >
              Click To Add a Vehicle
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Vehicles));
