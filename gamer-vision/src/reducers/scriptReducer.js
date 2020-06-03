import _ from "lodash";
import { CREATE_SCRIPT, FETCH_MY_SCRIPTS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_SCRIPT:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_MY_SCRIPTS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    default:
      return state;
  }
};
