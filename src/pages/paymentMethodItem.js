import React, { Component } from "react";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

//MUI
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Divider } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  phoneNumGrid: {
    top: "20px",
  },
  containerRoot: {
    background: "white",
  },
  field: {
    //textDecoration: "underline",
    marginTop: 10,
  },
  divider: {
    marginTop: 20,
    //marginBottom: 20,
    //display: "block",
  },
});

class paymentMethodItem extends Component {
  state = {
    cardBrand: "",
    last4: "",
    expDate: "",
  };
  mapUserDetailsToState = (user) => {
    this.setState({
      email: user.email ? user.email : "",
      phoneNumber: user.phoneNumber ? user.phoneNumber : "",
      displayName: user.displayName ? user.displayName : "",
      firstName: user.firstName ? user.firstName : "",
      lastName: user.lastName ? user.lastName : "",
    });
  };

  componentDidMount() {
    const { user } = this.props;
    this.mapUserDetailsToState(user);
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { classes, user } = this.props;

    console.log("yayayayayayay");
    console.log(this.props.last4);
    console.log(this.props.brand);
    console.log(this.props.expMonth);

    return (
      <Container>
        <Grid>
          <Grid item>
            <Typography variant="h5">{this.props.last4}</Typography>
          </Grid>

          <Grid item>
            <Typography variant="h7">{this.props.brand}</Typography>
          </Grid>
          <Grid item className={classes.field}>
            <Typography variant="h8">
              {this.props.expMonth}/{this.props.expYear}
            </Typography>
          </Grid>
          <Grid item className={classes.divider}>
            <Divider></Divider>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

paymentMethodItem.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(paymentMethodItem));
