import { SET_BOOKINGS } from "../types";

export const setBookings = (bookings) => (dispatch) => {
  dispatch({ type: SET_BOOKINGS, payload: bookings });
};
