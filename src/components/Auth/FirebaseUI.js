// Import FirebaseAuth and firebase.
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../../util/firebase";
import { Container, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setUserData, saveUserData } from "../../redux/actions/userActions";

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  // signInSuccessUrl: "/dashboard/profile",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    "apple.com",
  ],
  callbacks: {
    //  redirects after sign-in.
    /*signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;*/
    signInSuccessWithAuthResult: () => false,
    //},
  },
};

const styles = () => ({
  root: {
    background: '#f5f5f5',
    padding: 30,
    marginTop: 30,
    borderRadius: 4,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& p': {
      color: '#0a0a0a',
      fontSize: 25,
      lineHeight: 1.2,
      fontWeight: '300',
      flex: 1
    }
  }
});

class FirebaseUI extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      credentials: {},
    };
  }

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authenticated: !!user, credentials: user });
        var firstName = "";
        var lastName = "";
        if (user.displayName) {
          const nameArray = user.displayName.split(" ");
          firstName = nameArray[0];
          lastName = nameArray[1];
        }

        const created = user.metadata.creationTime;
        const lastSignin = user.metadata.lastSignInTime;

        const userData = {
          email: user.email ? user.email : "",
          phoneNumber: user.phoneNumber ? user.phoneNumber : "",
          uid: user.uid,
          displayName: user.displayName ? user.displayName : "",
          firstName: firstName,
          lastName: lastName,
          created: created,
          lastSignin: lastSignin,
        };

        this.props.setUserData(userData);
        this.props.saveUserData(userData, this.props.history);
      }

      //this.props.history.push("/dashboard/profile");
    });
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  render() {
    const { classes } = this.props;

    return (
      <Container className={classes.root}>
        <div className={classes.container}>
          <p>You need to sign in or create <br/>an account to continue</p>
          <div style={{flex: 1}}>
            <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
          </div>

        </div>
      
        <p>
        By continuing with this purchasing process you indicate that you have read and agree with our Privacy Policy and Terms & Conditions.
        </p>
      </Container>
    );
  }
}
FirebaseUI.propTypes = {
  user: PropTypes.object.isRequired,
  setUserData: PropTypes.func.isRequired,
  saveUserData: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  setUserData,
  saveUserData,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(FirebaseUI));
