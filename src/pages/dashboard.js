import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import DashMenu from "../components/DashBoard/DashMenu";

const styles = {
  root: {
    display: "flex",
  },
};

class dashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <DashMenu></DashMenu>
      </div>
    );
  }
}

export default withStyles(styles)(dashboard);
