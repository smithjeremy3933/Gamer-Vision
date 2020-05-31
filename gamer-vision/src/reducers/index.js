import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import gameReducer from "./gameReducer";
import allGamesReducer from "./allGamesReducer";
import scriptReducer from "./scriptReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  games: gameReducer,
  allGames: allGamesReducer,
  scripts: scriptReducer,
});
