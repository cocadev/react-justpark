import React, { Component } from "react";
import { Link } from "react-router-dom";

//Redux
import { connect } from "react-redux";

//MUI
import { Grid, Container, Typography, Button, withStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import firebase from "firebase";
import CustomText from "../../Atom/CustomText";

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
    color: '#999',
    padding: "20px 0",
    border: "1px dashed #cdd3db",
    borderRadius: "0",
    background: "#f8f9fb"
  },
  listItem: {
    width: '100%',
    marginTop: 10,
    marginBottom: 25,
    '& div': {
      borderRadius: 4,
      border: '1px solid #dee2e8',
      background: '#f8f9fb',
      padding: 22,
      marginRight: 12
    }
  },
  viewText: {
    textDecoration: 'underline',
    fontSize: 13,
    fontFamily: 'Nunito,Avenir,sans-serif',
    cursor: 'pointer',
    textTransform: "none"
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
    const { currentVehicle } = this.state;

    return (
      <Container style={{ margin: '20px 0 15px' }}>
        <CustomText title="Vehicles" type="title" />

        <CustomText
          type="description"
          title={
            currentVehicle
              ? 'Your most recently used vehicle is listed below. To add more, or view all your vehicles, please click the "View more details" link.'
              : 'You have no vehicles added. Click below to add your first vehicle.'
          }
        />

        <div style={{ marginTop: "20px" }}>
          <div className={classes.listItem}>
            <div>{currentVehicle}</div>
          </div>
          {!currentVehicle && <Button
            fullWidth
            variant="outlined"
            to="/dashboard/vehicles"
            component={Link}
            onClick={this.handleSubmit}
            startIcon={<AddIcon />}
            className={classes.addButton}
          >
            Click To Add a Vehicle
          </Button>}
          {
            currentVehicle &&
            <Button
              to="/dashboard/vehicles"
              component={Link}
              className={classes.viewText}
              disableRipple={true}
              disableElevation={true}
              variant='text'
            >
              View more details
            </Button>
          }
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Vehicles));
