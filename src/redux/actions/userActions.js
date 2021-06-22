import {
  SET_USER,
  SAVE_USER,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";
import firebase from "../../util/firebase";

const db = firebase.database();

export const setUserData = (userData) => (dispatch) => {
  dispatch({ type: SET_USER, payload: userData });
};

export const saveUserData = (userData, history) => (dispatch) => {
  dispatch({ type: SAVE_USER });

  if (userData.created == userData.lastSignin) {
    db.ref("Users/" + userData.uid).set({
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      email: userData.email,
      id: userData.uid,
      address_verified: false,
      dateJoined: firebase.database.ServerValue.TIMESTAMP,
    });
    db.ref("phoneNumbers/" + userData.uid).set({
      number: userData.phoneNumber,
    });
  }

  history.push("/dashboard/profile");
};

export const editUserData = (userData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  const updates = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    phoneNumber: userData.phoneNumber,
    email: userData.email,
  };
  db.ref("Users/" + userData.uid).update(updates);
};
export const logoutUser = (history) => (dispatch) => {
  //localStorage.removeItem("FBIdToken");
  //delete axios.defaults.headers.common["Authorization"];

  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      dispatch({ type: SET_UNAUTHENTICATED });
    })
    .catch((error) => {
      console.log(error.code);
      // An error happened.
    });
};
