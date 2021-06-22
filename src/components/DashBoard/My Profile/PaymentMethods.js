import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { connect } from "react-redux";
import { Grid, Container, Button, withStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CustomText from "../../Atom/CustomText";

var userId;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    userId = firebase.auth().currentUser.uid;
  } else {
    userId = "0";
  }
});

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
  addButton: {
    color: '#999',
    padding: "20px 0",
    border: "1px dashed #cdd3db",
    borderRadius: "0",
    background: "#f8f9fb"
  }
});

class PaymentMethods extends Component {
  state = {
    isMethod: false,
    defaultMethod: "",
    stripeCustomerId: "",
    output: "",
    defaultBrand: "",
    defaultLast4: "",
    defaultExpDate: "",
    pmArray: [],
  };
  mapUserDetailsToState = (user) => {
    let car = this;
    var newRef = firebase
      .database()
      .ref("Users/" + userId + "/stripe/paymentMethods/");

    newRef.on("value", function (snapshot) {
      if (snapshot.hasChild("isDefault")) {
        var getPaymentMethods = firebase
          .functions()
          .httpsCallable("getPaymentMethods");
        getPaymentMethods({
          customerID: snapshot.child("stripeCustomerID").val(),
        }).then(function (result) {
          // Read result of the Cloud Function.
          //var sanitizedMessage = result.data.text;

          var i;
          var pmArray = [];
          for (i = 0; i < result.data.length; i++) {
            pmArray.push(result.data[i]);
            if (result.data[i]["id"] == snapshot.child("isDefault").val()) {
              var expDate =
                result.data[i]["card"]["exp_month"] +
                "/" +
                result.data[i]["card"]["exp_year"].toString().slice(-2);

              car.setState({
                isDefault: snapshot.child("isDefault").val(),
                isMethod: true,
                stripeCustomerId: snapshot.child("stripeCustomerID").val(),
                output: result.data[i]["id"],
                defaultBrand: result.data[i]["card"]["brand"],
                defaultLast4: result.data[i]["card"]["last4"],
                defaultExpDate: expDate,
                pmArray: pmArray,
              });
            }
          }

          // ...
        });
      }
    });
  };

  componentDidMount() {
    const { user } = this.props;
    this.mapUserDetailsToState(user);
  }

  render() {
    const { classes } = this.props;

    return (
      <Container style={{margin: '20px 0 15px'}}>
        <CustomText title="Payment Methods" type="title" />

        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <CustomText type="description" title=
              {this.state.isMethod
                ? this.state.defaultBrand +
                " - " +
                this.state.defaultLast4 +
                " " +
                this.state.defaultExpDate
                : "You have no payment methods added. Click below to add your first payment method."}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Button
              fullWidth
              variant="outlined"
              to="/paymentmethods"
              component={Link}
              onClick={this.handleSubmit}
              startIcon={<AddIcon />}
              className={classes.addButton}
            >
              Click To Add a Payment Method
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

export default connect(mapStateToProps)(withStyles(styles)(PaymentMethods));
