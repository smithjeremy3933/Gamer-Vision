import history from "../history";
import projects from "../apis/projects";
import {
  CREATE_GAME,
  EDIT_GAME,
  FETCH_GAME,
  FETCH_GAMES,
  DELETE_GAME,
  AUTH_USER,
  AUTH_ERROR,
} from "./types";

export const signup = (formValues) => async (dispatch) => {
  try {
    const response = await projects.post("/signup", formValues);
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("token", response.data.token);
    history.push("/projects");
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

export const signin = (formValues) => async (dispatch) => {
  try {
    const response = await projects.post("/signin", formValues);
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("token", response.data.token);
    history.push("/projects");
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid Login Information" });
  }
};

export const signout = () => {
  localStorage.removeItem("token");
  return {
    type: AUTH_USER,
    payload: "",
  };
};

export const createGame = (formValues) => async (dispatch, getState) => {
  const { userId, username } = getState().auth;
  const response = await projects.post("/projects", {
    ...formValues,
    userId,
    username,
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

// export const signIn = (userId, username) => {
//   return {
//     type: SIGN_IN,
//     payload: { userId: userId, username, username },
//   };
// };

// export const signOut = () => {
//   return {
//     type: SIGN_OUT,
//   };
// };
