import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/prked.png";
import axios from "axios";
import { Link } from "react-router-dom";
import firebase from "../util/firebase";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const window = {
  recaptchaVerifier: undefined,
};

const styles = (theme) => ({
  ...theme.spread,
});

const db = firebase.database();

class signup extends Component {
  constructor() {
    super();
    this.state = {
      phoneNum: "",
      firstName: "",
      lastName: "",
      email: "",
      otp: "",
      loading: false,
      key: "",
      errors: {},
    };
  }
  //Saves user data to firebase under users/{uid}

  saveUserData = () => {
    db.ref("Users/" + this.state.key).set({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNum,
      email: this.state.email,
      id: this.state.key,
      address_verified: false,
      dateJoined: firebase.database.ServerValue.TIMESTAMP,
    });
    db.ref("phoneNumbers/" + this.state.key).set({
      number: this.state.phoneNum,
    });
  };
  //Sets up google recaptcha
  setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("Captcha Resolved");
          //this.onSignInSubmit();
        },
        defaultCountry: "US",
      }
    );
  };

  //Called when user submits phone number, then sends them sms
  onSignInSubmit = (e) => {
    e.preventDefault();
    this.setUpRecaptcha();
    this.setState({
      loading: true,
    });
    let number = document.getElementById("phoneNum").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let phoneNumber = "+1" + number;
    console.log(phoneNumber);
    let appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        this.setState({
          loading: false,
          phoneNum: number,
          firstName: firstName,
          lastName: lastName,
          email: email,
        });
        window.confirmationResult = confirmationResult;
        // console.log(confirmationResult);
        console.log("OTP is sent");
      })
      .catch((error) => {
        this.setState({
          loading: false,
          errors: error.response.data,
        });
        console.log(error);
      });
  };

  //Called when user submits OTP. this verifies code and signs user in
  onSubmitOtp = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    let otpInput = document.getElementById("otp").value;
    let optConfirm = window.confirmationResult;
    // console.log(codee);
    optConfirm
      .confirm(otpInput)
      .then((result) => {
        // User signed in successfully.
        console.log("Result" + result.user.uid);
        let uid = result.user.uid;
        let user = result.user;
        let token = user.getIdToken().then((token) => {
          localStorage.setItem("FBIdToken", `Bearer ${token}`);
        });
        this.setState({
          loading: false,
          key: uid,
        });
        this.saveUserData();
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({
          loading: false,
          //errors: error.response.data,
        });
        console.log(error);
        alert("Incorrect OTP");
      });
  };

  render() {
    return (
      <Grid container>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="monkey" />
          <Typography variant="h2">Signup</Typography>
          <div id="recaptcha-container"></div>
          <form noValidate onSubmit={this.onSignInSubmit}>
            <TextField
              id="firstName"
              name="firstName"
              type="text"
              label="First Name"
              fullWidth
              onChange={this.onChangeHandler}
            />
            <br />
            <TextField
              id="lastName"
              name="lastName"
              type="text"
              label="Last Name"
              fullWidth
              onChange={this.onChangeHandler}
            />
            <br />
            <TextField
              id="email"
              name="email"
              type="text"
              label="Email"
              fullWidth
              onChange={this.onChangeHandler}
            />
            <br />

            <TextField
              id="phoneNum"
              name="phoneNum"
              type="text"
              label="Phone Number"
              fullWidth
              onChange={this.onChangeHandler}
            />

            <Button type="submit" variant="contained" color="primary">
              Send Code
            </Button>
            <br />
            <small>
              Already have an account ? Login here <Link to="/login">here</Link>
            </small>
          </form>
          <form noValidate onSubmit={this.onSubmitOtp}>
            <TextField
              id="otp"
              name="otp"
              type="number"
              label="OTP"
              fullWidth
              onChange={this.onChangeHandler}
            />

            <Button type="submit" variant="contained" color="primary">
              Submit OTP
            </Button>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(signup);
