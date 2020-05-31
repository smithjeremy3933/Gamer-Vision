import _ from "lodash";
import { CREATE_SCRIPT } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_SCRIPT:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
};
