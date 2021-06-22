import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

// We can inject some CSS into the DOM.
const styles = {
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  typoGray: {
    color: "#A9A9A9",
  },
  paper: {
    background: "#F8F8F8",
  },
  typoBold: {
    fontWeight: "bold",
  },
};

export class SpotTripInfo extends Component {
  render() {
    const { classes } = this.props;

    let price = this.props.price;
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item md={4}>
            <Paper className={classes.paper}>
              <Typography className={classes.typoBold} align="center">
                1h
              </Typography>
              <Typography className={classes.typoGray} align="center">
                Total Duration
              </Typography>
            </Paper>
          </Grid>
          <Grid item md={4}>
            <Paper className={classes.paper}>
              <Typography className={classes.typoBold} align="center">
                ${price}
              </Typography>
              <Typography className={classes.typoGray} align="center">
                Total Price
              </Typography>
            </Paper>
          </Grid>
          <Grid item md={4}>
            <Paper className={classes.paper}>
              <Typography className={classes.typoBold} align="center">
                19 mins
              </Typography>
              <Typography
                className={classes.typoGray}
                align="center"
                color="secondary"
              >
                To Destination
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(SpotTripInfo);
