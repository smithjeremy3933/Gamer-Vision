import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import gameReducer from "./gameReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  games: gameReducer,
});
