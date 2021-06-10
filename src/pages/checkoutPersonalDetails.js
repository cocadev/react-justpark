import { Container, TextField, Typography } from "@material-ui/core";
import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";

import firebase from "firebase";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setVehicleData } from "../redux/actions/dataActions";

var userId;

class checkoutPersonalDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      phoneNumber: "",
      vehicle: "",
      vehicleId: "",
      addingNewVehicle: "",
      vehiclePlates: [],
      editDetails: false,
      shouldAddNew: false,
    };
  }

  async getPersonalDetails(n) {
    let info = this;
    var newRef = firebase.database().ref("Users/" + this.props.user.uid);

    newRef.on("value", function (snapshot) {
      var fullName =
        snapshot.child("firstName").val() +
        " " +
        snapshot.child("lastName").val();
      var email = snapshot.child("email").val();
      var phoneNumber = snapshot.child("phoneNumber").val();
      var vehicle = snapshot
        .child("vehicles")
        .child("main")
        .child("value")
        .val();
      var vehicleId = snapshot
        .child("vehicles")
        .child("main")
        .child("key")
        .val();

      var shouldAddNew = false;

      if (vehicle == null) {
        shouldAddNew = false;
      } else {
        shouldAddNew = true;
      }

      info.setState({
        name: fullName,
        email: email,
        phoneNumber: phoneNumber,
        vehicle: vehicle,
        vehicleId: vehicleId,
        shouldAddNew: shouldAddNew,
      });
    });
  }

  selectVehicle(item) {
    let info = this;
    //this function deletes the selected vehicle

    console.log(item);

    info.setState({
      vehicle: item[1],
      vehicleId: item[0],
    });
    console.log(this.state.vehicle);
    console.log(this.state.vehicleId);
    this.props.setVehicleData(this.state.vehicle);

    this.saveChanges();
  }

  saveChanges() {
    let save = this;

    save.setState({
      editDetails: false,
    });
  }

  clickEdit() {
    let edit = this;

    var query = firebase
      .database()
      .ref(`Users/${this.props.user.uid}/vehicles`)
      .orderByKey();
    query.on("value", function (snapshot) {
      var plates = [];
      var num = [];
      snapshot.forEach(function (childSnapshot) {
        // gets vehicle unique id
        var key = childSnapshot.key;

        // gets vehicle license plate
        var childData = childSnapshot.child("license_plate").val();
        //pushes both to plates array

        if (key != "main") {
          plates.push([key, childData]);
        }
      });

      //set state to vehiclePlates to re-render
      edit.setState({
        vehiclePlates: plates,
        editDetails: true,
      });
    });
  }

  writeUserData(userId, plateNumber) {
    if (plateNumber == "") {
      this.setState({
        textError: true,
      });
    } else {
      this.setState({
        textError: false,
      });
      //this function adds a new vehicle

      // newRef is reference to users vehicle node
      var newRef = firebase.database().ref("Users/" + userId + "/vehicles/");
      // newRef is reference to unique id for vehicle added
      var newRef2 = newRef.push();
      //this sets user inouted plate number as licence_plate under unique vehicle id
      newRef2.set(
        {
          license_plate: plateNumber,
        },
        (error) => {
          if (error) {
            // The write failed...
          } else {
            // Data saved successfully!
          }
        }
      );

      //this updates the main node to identify which vehicle is the main vehicle, usually last one added
      newRef.update(
        {
          main: { key: newRef2.key, value: plateNumber },
        },
        (error) => {
          if (error) {
            // The write failed...
          } else {
            // Data saved successfully!
          }
        }
      );
    }
  }

  componentDidMount() {
    this.getPersonalDetails(0);
  }
  addNewVehicleSetting() {
    this.setState({
      shouldAddNew: false,
    });
  }

  render() {
    console.log(this.state.vehicle);
    if (this.state.vehicle == null) {
      console.log("it is empty");
    }
    return (
      <Card>
        <CardContent>
          <Typography variant="h5">1. Personal Details</Typography>
          <br />

          <Typography variant="h6">{this.props.user.firstName}</Typography>
          <br />
          <Typography variant="h9">{this.props.user.email}</Typography>
          <br />

          {!(this.state.shouldAddNew == false) ? (
            <div>
              <Button onClick={() => this.clickEdit()}>edit</Button>
              {this.state.editDetails ? (
                <Container>
                  <Typography variant="h9">Select Vehicle</Typography>

                  <List>
                    {this.state.vehiclePlates.map((item) => {
                      return (
                        <ListItem>
                          {item[1]}
                          <Button onClick={() => this.selectVehicle(item)}>
                            Select
                          </Button>
                        </ListItem>
                      );
                    })}
                  </List>

                  <Button onClick={() => this.addNewVehicleSetting()}>
                    + Add another vehicle
                  </Button>
                </Container>
              ) : (
                <Typography variant="h9">
                  Current Vehicle - {this.state.vehicle}
                </Typography>
              )}
            </div>
          ) : (
            <form>
              <TextField
                error={this.state.textError}
                //className={classes.field}
                id="plateNumber"
                label="Enter vehicle number plate"
                color="primary"
                fullWidth
              />
              <Button
                //className={classes.btn}

                onClick={() =>
                  this.writeUserData(
                    userId,
                    document.getElementById("plateNumber").value
                  )
                }
                color="primary"
              >
                + Add another vehicle
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  vehicle: state.vehicle,
  user: state.user,
});

const mapActionsToProps = {
  setVehicleData,
};

checkoutPersonalDetails.propTypes = {
  vehicle: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(checkoutPersonalDetails);
