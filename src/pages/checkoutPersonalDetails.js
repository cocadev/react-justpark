import { Container, TextField, Typography } from "@material-ui/core";
import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "firebase";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setVehicleData } from "../redux/actions/dataActions";
import CustomText from "../components/Atom/CustomText";

const useStyles = () => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  btn: {
    width: 120,
    height: 40,
    marginLeft: 20
  },
  detail: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    cursor: 'pointer',
    '& div': {
      borderRadius: 4,
      borderRadius: 4,
      border: '1px solid #dee2e8',
      background: '#f8f9fb',
      padding: 22,
      width: '100%',
      padding: 18,
      marginRight: 12
    }
  }
});

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
      // var num = [];
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
    const { classes } = this.props;

    if (this.state.vehicle == null) {
      console.log("it is empty");
    }
    return (
      <Card style={{padding: 20}}>
        <CardContent>
          <CustomText title="1. Personal Details" type='title' />
          <br /><br />

          <CustomText title={this.props.user.firstName} type='formTitle' />

          <CustomText title={this.props.user.email} type='description' />

          <br />

          {!(this.state.shouldAddNew == false) ? (
            <div>
              {/* <Button onClick={() => this.clickEdit()}>edit</Button> */}
              {this.state.editDetails ? (
                <Container>
                  <CustomText title="Select Vehicle" type="formTitle"/>
                  <List>
                    {this.state.vehiclePlates.map((item) => {
                      return (
                        <div className={classes.detail} onClick={() => this.selectVehicle(item)}>
                          <div>{item[1]}</div>
                        </div>
                      );
                    })}
                  </List>

                  <Button onClick={() => this.addNewVehicleSetting()}>
                    + Add another vehicle
                  </Button>
                </Container>
              ) : (
                <div onClick={() => this.clickEdit()} className={classes.detail}>
                  <div>{this.state.vehicle}</div>
                </div>
              )}
            </div>
          ) : (
            <div className={classes.row}>
              <form>
                <TextField
                  error={this.state.textError}
                  id="plateNumber"
                  label="Enter vehicle number plate"
                  color="primary"
                  fullWidth
                  size='small'
                  variant="outlined"
                />
              </form>

              <Button
                className={classes.btn}
                onClick={() =>
                  this.writeUserData(
                    userId,
                    document.getElementById("plateNumber").value
                  )
                }
                color="primary"
                variant="contained"
              >
                Add
              </Button>
            </div>
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
)(withStyles(useStyles)(checkoutPersonalDetails));
