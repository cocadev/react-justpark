import React, { Component } from "react";

//MUI
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import MenuOptions from "./MenuOptions";

import withStyles from "@material-ui/core/styles/withStyles";

const drawerWidth = 240;

const styles = (theme) => ({
  drawerPaper: {
    width: drawerWidth,
    top: "50px",
    background: "rgb(" + 239 + "," + 244 + "," + 244 + ")",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },

  drawerContainer: {
    overflow: "auto",
  },
});

export class DashMenu extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.drawerContainer}>
        <Drawer
          variant="permanent"
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Divider />
          <List>
            <MenuOptions />
          </List>
          <Divider />
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(DashMenu);
