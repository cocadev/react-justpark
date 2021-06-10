import React, { Component } from "react";

//MUI
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

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
