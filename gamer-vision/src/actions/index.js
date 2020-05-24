import history from "../history";
import projects from "../apis/projects";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_GAME,
  EDIT_GAME,
  FETCH_GAME,
  FETCH_GAMES,
  DELETE_GAME,
} from "./types";
import cors from "cors";
const proxyurl = "https://cors-anywhere.herokuapp.com/";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createGame = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await projects.post("/projects", {
    ...formValues,
    userId,
  });
  dispatch({ type: CREATE_GAME, payload: response.data });
  history.push("/");
};

export const fetchGames = () => async (dispatch) => {
  const response = await projects.get("/projects");
  dispatch({ type: FETCH_GAMES, payload: response.data });
};

export const fetchGame = (_id) => async (dispatch) => {
  const response = await projects.get(`/projects/${_id}`);
  dispatch({
    type: FETCH_GAME,
    payload: response.data,
  });
};

export const editGame = (id, formValues) => async (dispatch) => {
  const response = await projects.patch(`/projects/${id}`, formValues);

  dispatch({ type: EDIT_GAME, payload: response.data });
  history.push("/");
};

export const deleteGame = (_id) => async (dispatch) => {
  await projects.delete(`/projects/${_id}`);

  dispatch({ type: DELETE_GAME, payload: _id });
  history.push("/");
};
