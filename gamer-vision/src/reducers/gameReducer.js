import _ from "lodash";
import {
  CREATE_GAME,
  EDIT_GAME,
  FETCH_GAME,
  DELETE_GAME,
  FETCH_MY_GAMES,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_MY_GAMES:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case FETCH_GAME:
      return { ...state, [action.payload._id]: action.payload };
    case CREATE_GAME:
      return { ...state, [action.payload._id]: action.payload };
    case EDIT_GAME:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_GAME:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
