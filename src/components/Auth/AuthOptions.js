/* NOT BEING USED








import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import googleIcon from "../../images/googleNormal.png";

//MUI
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  ...theme.spread,
  google: {},
});

class AuthOptions extends Component {
  render() {
    return (
      <Grid container justify="center" spacing={2}>
        <Grid item sm={12}>
          <div className="google">
            <Button variant="text">
              <img src={googleIcon} alt="googleIcon" />
            </Button>
          </div>
        </Grid>
        <Grid item sm={12}>
          <Button variant="contained">
            <img src={googleIcon} alt="googleIcon" />
          </Button>
        </Grid>
        <Grid item sm={12}>
          <Button variant="contained">
            <span>Create account with phone number</span>
          </Button>
        </Grid>
        <Grid item sm={12}>
          <Button variant="contained">Sign in with phone number</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AuthOptions);*/
