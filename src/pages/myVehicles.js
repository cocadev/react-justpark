import React from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

import Dashboard from "./dashboard";

import firebase from "firebase";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

//import { withStyles } from "@material-ui/core/styles";
//import React, {Component} from "react";

const useStyles = (theme) => ({
  btn: {
    fontSize: 60,
    backgroundColor: "violet",
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
  grid: {
    marginTop: 30,
  },
});

var userId;

//function to get firebase uid
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    userId = firebase.auth().currentUser.uid;
  } else {
    userId = "0";
  }
});

class myVehicles extends React.Component {
  constructor(props) {
    super(props);

    //creates vehiclePlates array state
    this.state = {
      vehiclePlates: [],
      textError: false,
    };
  }

  async getVehicles(n) {
    //this function retrieves all the vehicles within the users vehicle node
    let car = this;

    var query = firebase
      .database()
      .ref(`Users/${userId}/vehicles`)
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
      car.setState({
        vehiclePlates: plates,
      });
    });
  }

  componentDidMount() {
    // this is a react thing that runs before component is rendered
    // that way it pulls the data first and then renders
    this.getVehicles(0);
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

  deleteVehicle(item) {
    //this function deletes the selected vehicle
    var main;
    var mainVal;
    var lastAddedKey;
    var lastAddedVal;
    var bool = false;
    var newRef = firebase.database();

    newRef.ref("Users/" + userId + "/vehicles/" + item[0]).remove();
    var count = this.state.vehiclePlates.length;

    var mainKey = newRef.ref("Users/" + userId + "/vehicles");

    if (count > 1) {
      mainKey
        .orderByChild("timestamp")
        .limitToLast(2)
        .on("child_added", function (snapshot) {
          if (snapshot.exists()) {
            if (snapshot.key != "main") {
              lastAddedKey = snapshot.key;
              lastAddedVal = snapshot.child("/license_plate").val();
            }
            if (snapshot.key == "main") {
              main = snapshot.child("/key").val();
              mainVal = snapshot.child("/value").val();
              if (item[0] == snapshot.child("/key").val()) {
                bool = true;
              }
            }
            if (bool == true) {
              mainKey.child("/main").set({
                key: lastAddedKey,
                value: lastAddedVal,
              });
            }
          }
        });
    } else {
      newRef.ref("Users/" + userId + "/vehicles/main").remove();
    }
  }

  render() {
    if (this.state.vehiclePlates.length != 0) {
      //return null;
    }

    const { classes } = this.props;

    return (
      <Container>
        <Dashboard />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={4}
          className={classes.grid}
        >
          <Card>
            <CardContent>
              <Grid item xs={12} sm={6}>
                <Typography className={classes.title} variant="h4" gutterBottom>
                  Vehicles
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h7" gutterBottom>
                  Below is a list of all the vehicles you have registered with
                  JustPark. You can also add new vehicles or delete old ones
                  from this page.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <form>
                  <TextField
                    error={this.state.textError}
                    className={classes.field}
                    id="plateNumber"
                    label="Enter vehicle number plate"
                    color="primary"
                    fullWidth
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CardActions>
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
                </CardActions>
              </Grid>
              <Grid item xs={12} sm={6}>
                <List>
                  {this.state.vehiclePlates.map((item) => {
                    return (
                      <ListItem>
                        {item[1]}
                        <Button onClick={() => this.deleteVehicle(item)}>
                          Delete Vehicle
                        </Button>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(useStyles)(myVehicles);
