import { withStyles } from "@material-ui/core";
import React, { Component } from "react";

import SideBar from "../DashBoard/SideBar/SideBar"

export default function Layout(WrappedComponent) {
  const styles = (theme) => ({
    layout: {
      display: "flex",
      background: "#f8f9fb",
      minHeight: `calc(100vh - ${theme.layout.header.height}px)`,
    },
  });
  class Layout extends Component {
    render() {
      const { classes } = this.props;

      return (
        <div className={classes.layout}>
          <SideBar />
          <WrappedComponent />
        </div>
      );
    }
  }

  return withStyles(styles)(Layout);
}