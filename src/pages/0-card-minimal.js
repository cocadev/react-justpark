// @noflow

import React from "react";

import Button from "@material-ui/core/Button";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import firebase from "firebase";

//import "../styles/common.css";

var userId;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    userId = firebase.auth().currentUser.uid;
  } else {
    userId = "0";
  }
});

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.

      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);

      var expYear = paymentMethod.card["exp_year"];
      var expMonth = paymentMethod.card["exp_month"];
      var dateStr;
      if (expMonth < 10) {
        dateStr =
          "0" + expMonth.toString() + "/" + expYear.toString().slice(-2);
      }

      var newRef = firebase
        .database()
        .ref("Users/" + userId + "/stripe/paymentMethods/");

      newRef.on("value", function (snapshot) {
        if (snapshot.hasChild("isDefault")) {
          var linkCustomerToPaymentMethod = firebase
            .functions()
            .httpsCallable("linkCustomerToPaymentMethod");
          linkCustomerToPaymentMethod({
            stripeCustomerID: snapshot.child("stripeCustomerID").val(),
            paymentMethodID: paymentMethod.id,
          })
            .then(function (result) {
              // Read result of the Cloud Function.
              //var sanitizedMessage = result.data.text;
              console.log(result);
              // ...
            })
            .catch((error) => {
              // Getting the Error details.
              console.log(error);
              // ...
            });

          console.log("already is customer");
        } else {
          var createStripeCustomer = firebase
            .functions()
            .httpsCallable("createStripeCustomer");
          createStripeCustomer({
            email: "zsaadioui@gmail.com",
            name: "Zack Saadioui",
            firebaseUID: userId,
            paymentMethodID: paymentMethod.id,
            cardLast4Nums: paymentMethod.card["last4"],
            cardBrand: paymentMethod.card["brand"],
            expiration: dateStr,
          }).then(function (result) {
            // Read result of the Cloud Function.
            //var sanitizedMessage = result.data.text;
            console.log(result);
            // ...
          });
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <Button type="submit" disabled={!stripe}>
        + Add Payment Method
      </Button>
    </form>
  );
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_fBjUAdEgBIK3XRZQ3mOGsxAd00wMisVYso");

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default App;
