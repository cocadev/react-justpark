import { SET_SPACE, SET_VEHICLE } from "../types";

const initialState = {
  listing: {},
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case SET_SPACE:
      return {
        ...action.payload,
      };

    case SET_VEHICLE:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
}
