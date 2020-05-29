import _ from "lodash";
import { FETCH_GAMES } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_GAMES:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    default:
      return state;
  }
};
