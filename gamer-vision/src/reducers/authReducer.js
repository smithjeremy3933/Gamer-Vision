import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  username: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.userId,
        username: action.payload.username,
      };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null, username: null };
    default:
      return state;
  }
};
