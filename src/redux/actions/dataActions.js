import { SET_SPACE, SET_VEHICLE } from "../types";
import firebase from "../../util/firebase";

const db = firebase.database();

export const setSpaceData = (listingData, history) => (dispatch) => {
  dispatch({ type: SET_SPACE, payload: listingData });

  history.push("/checkout");
};

export const setVehicleData = (vehicleData) => (dispatch) => {
  dispatch({ type: SET_VEHICLE, payload: vehicleData });
};
