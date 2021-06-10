import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import FirebaseUI from "../components/Auth/FirebaseUI";

//MUI
import Grid from "@material-ui/core/Grid";

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
