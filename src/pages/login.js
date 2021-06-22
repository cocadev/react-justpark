import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/prked.png";
import { Link } from "react-router-dom";
import firebase from "../util/firebase";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const window = {
  recaptchaVerifier: undefined,
};

const styles = (theme) => ({
  ...theme.spread,
});

const db = firebase.database();

class login extends Component {
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
    let number = document.getElementById("phoneNum").value;
    let phoneNumber = "+1" + number;
    console.log(phoneNumber);
    let appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log(confirmationResult);
        console.log("OTP is sent");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Called when user submits OTP. this verifies code and signs user in
  onSubmitOtp = (e) => {
    e.preventDefault();
    let otpInput = document.getElementById("otp").value;
    let optConfirm = window.confirmationResult;
    // console.log(codee);
    optConfirm
      .confirm(otpInput)
      .then(function (result) {
        // User signed in successfully.
        console.log("Result" + result.verificationID);
        let user = result.user;
        let token = user.getIdToken();
        localStorage.setItem("FBIdToken", `Bearer ${token}`);
      })
      .catch(function (error) {
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
          <Typography variant="h2">Login</Typography>
          <div id="recaptcha-container"></div>
          <form noValidate onSubmit={this.onSignInSubmit}>
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
              dont have an account ? sign up <Link to="/signup">here</Link>
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

login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(login);
