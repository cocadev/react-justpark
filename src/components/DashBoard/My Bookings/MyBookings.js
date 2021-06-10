import React, { Component } from "react";
import InProgress from "./InProgress";
import Past from "./Past";
import Upcoming from "./Upcoming";

//redux
//Redux
import { connect } from "react-redux";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";


const styles = (theme) => ({});

const useStyles = (theme) => ({
  container: {
    marginTop: 30,
  },
});

class MyBookings extends Component {
  state = {
    isInProgress: true,
    isPast: false,
    isUpcoming: false,
    output: <InProgress userId={this.props.userId} />,
  };
  mapUserDetailsToState = (user) => {};

  componentDidMount() {
    const { user } = this.props;

    this.mapUserDetailsToState(user);
  }

  inProgressClicked() {
    console.log("progress clicked");
    this.setState({
      isInProgress: true,
      isPast: false,
      isUpcoming: false,
      output: <InProgress userId={this.props.userId} />,
    });
  }
  pastClicked() {
    console.log("past clicked");
    this.setState({
      isInProgress: false,
      isPast: true,
      isUpcoming: false,
      output: <Past userId={this.props.userId} />,
    });
  }
  upcomingClicked() {
    console.log("upcoming clicked");

    this.setState({
      isInProgress: false,
      isPast: false,
      isUpcoming: true,
      output: <Upcoming userId={this.props.userId} />,
    });
  }

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
          <Grid item lg={7}>
            <Button onClick={() => this.inProgressClicked()}>
              In Progress
            </Button>
            <Button onClick={() => this.upcomingClicked()}>Upcoming</Button>
            <Button onClick={() => this.pastClicked()}>Past</Button>
          </Grid>

          <Grid item lg={7}>
            <Card>
              <CardContent>{this.state.output}</CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  booking: state.booking,
});

export default connect(mapStateToProps)(withStyles(styles)(MyBookings));
