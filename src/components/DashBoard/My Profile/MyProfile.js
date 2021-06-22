import React, { Component } from "react";
import AccountInfo from "./AccountInfo";
import Vehicles from "./Vehicles";
import PaymentMethods from "./PaymentMethods";

// MUI
import { Container, Grid, Card, CardContent, withStyles } from "@material-ui/core";

const styles = (theme) => ({
  container: {
    margin: "30px 0",
  },
});

class MyProfile extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.container}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={4}
        >
          <Grid item lg={10} md={10}>
            <Card>
              <CardContent>
                <AccountInfo />
              </CardContent>
            </Card>
          </Grid>

          <Grid item lg={10} md={10}>
            <Card>
              <CardContent>
                <Vehicles />
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={10} md={10}>
            <Card>
              <CardContent>
                <PaymentMethods />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(MyProfile);
