import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import googleIcon from "../images/googleNormal.png";
import FirebaseUI from "../components/Auth/FirebaseUI";

//MUI
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme.spread,
});

class auth extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      credentials: {},
    };
  }
  render() {
    return (
      <Grid container justify="center">
        <Grid item sm />
        <Grid item sm>
          <FirebaseUI></FirebaseUI>
        </Grid>
      </Grid>
    );
  }
}

auth.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps)(withStyles(styles)(auth));
