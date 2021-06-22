import React, { Component } from "react";
import firebase from "firebase";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

//MUI
import { Grid, Container, Typography, TextField, Button, withStyles } from "@material-ui/core";

import { editUserData, setUserData } from "../../../redux/actions/userActions";
import CustomText from "../../Atom/CustomText";

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
  title: {
    margin: "30px 0 20px",
  },
  field: {
    marginTop: 10,
    display: "block",
  },
});

class AccountInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.user.email,
      phoneNumber: this.props.user.phoneNumber,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
    };
  }

  mapUserDetailsToState = (user) => {
    let userRef = this;

    if (user.firstName === "") {
      var newRef = firebase.database().ref("Users/" + user.uid);

      newRef.on("value", function (snapshot) {
        let userData = {
          email: snapshot.val().email,
          phoneNumber: snapshot.val().phoneNumber,
          firstName: snapshot.val().firstName,
          lastName: snapshot.val().lastName,
          uid: snapshot.val().id,
        };
        userRef.setState({
          email: snapshot.val().email,
          phoneNumber: snapshot.val().phoneNumber,
          firstName: snapshot.val().firstName,
          lastName: snapshot.val().lastName,
        });

        userRef.props.setUserData(userData);
      });
    }

    /*this.setState({
      email: user.email ? user.email : "",
      phoneNumber: user.phoneNumber ? user.phoneNumber : "",
      displayName: user.displayName ? user.displayName : "",
      firstName: user.firstName ? user.firstName : "",
      lastName: user.lastName ? user.lastName : "",
      uid: user.uid ? user.uid : "",
    });*/
  };

  handleSubmit = () => {
    const userData = {
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      uid: this.props.user.uid,
    };
    this.props.setUserData(userData);
    this.props.editUserData(userData);
  };

  componentDidMount() {
    const { user } = this.props;
    this.mapUserDetailsToState(user);
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {

    return (
      <Container style={{margin: '20px 0 15px'}}>
         <CustomText title={'Account Information'} type={'title'}/> 

        <CustomText type={'description'} title={'You can edit your Prked profile information below. Clicking on the reset password button will send a reset link to your email.'}/> 

        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              id="firstName"
              label="First Name"
              variant="outlined"
              fullWidth
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              id="lastName"
              label="Last Name"
              variant="outlined"
              fullWidth
              type="text"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="phoneNumber"
              id="phoneNumber"
              label="Phone Number"
              variant="outlined"
              fullWidth
              type="text"
              value={this.state.phoneNumber}
              onChange={this.handleChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="email"
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Button onClick={this.handleSubmit} variant="outlined" size="large">
              Save
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  editUserData,
  setUserData,
};

AccountInfo.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(AccountInfo));
