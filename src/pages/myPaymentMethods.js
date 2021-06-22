import React, { Component } from "react";
import PaymentMethodItem from "./paymentMethodItem";

//Redux
import { connect } from "react-redux";

//MUI
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";

import List from "@material-ui/core/List";

import firebase from "firebase";

// import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./0-card-minimal";

// const stripePromise = loadStripe("pk_test_fBjUAdEgBIK3XRZQ3mOGsxAd00wMisVYso");

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
    //textDecoration: "underline",
    marginTop: 30,
  },
});

class MyPaymentMethods extends Component {
  state = {
    isMethod: false,
    defaultMethod: "",
    stripeCustomerId: "",
    pmArray: [],
  };
  mapUserDetailsToState = (user) => {
    let method = this;

    var newRef = firebase
      .database()
      .ref("Users/" + userId + "/stripe/paymentMethods/");

    newRef.on("value", function (snapshot) {
      if (snapshot.hasChild("isDefault")) {
        method.setState({
          isDefault: snapshot.child("isDefault").val(),
          isMethod: true,
          stripeCustomerId: snapshot.child("stripeCustomerId").val(),
        });

        var getPaymentMethods = firebase
          .functions()
          .httpsCallable("getPaymentMethods");
        getPaymentMethods({
          customerID: snapshot.child("stripeCustomerID").val(),
        }).then(function (result) {
          var i;
          var pmArray = [];
          for (i = 0; i < result.data.length; i++) {
            pmArray.push([
              result.data[i]["card"]["last4"],
              result.data[i]["card"]["brand"],
              result.data[i]["card"]["exp_month"],
              result.data[i]["card"]["exp_year"],
            ]);
          }

          method.setState({
            pmArray: pmArray,
          });

          console.log(method.state.pmArray);
        });
      }
    });
  };

  componentDidMount() {
    const { user } = this.props;
    this.mapUserDetailsToState(user);
  }

  render() {

    console.log(this.props.pmArray);
    return (
      <Container>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} sm={12} md={12} lg={6} xl={12}>
            <CheckoutForm
              userId={userId}
              customerId={this.state.stripeCustomerId}
            >
              f
            </CheckoutForm>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <List>
              {this.state.pmArray.map((item) => {
                return (
                  <ListItem>
                    <PaymentMethodItem
                      last4={item[0]}
                      brand={item[1]}
                      expMonth={item[2]}
                      expYear={item[3]}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(MyPaymentMethods));
