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
  FETCH_MY_GAMES,
  CREATE_SCRIPT,
  FETCH_MY_SCRIPTS,
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

export const createGame = (formValues, authentication) => async (
  dispatch,
  getState
) => {
  const response = await projects.post(
    "/projects",
    {
      ...formValues,
    },
    {
      headers: {
        authorization: authentication,
      },
    }
  );
  dispatch({ type: CREATE_GAME, payload: response.data });
  history.push("/projects");
};

export const fetchGames = () => async (dispatch) => {
  const response = await projects.get("/allprojects");
  dispatch({ type: FETCH_GAMES, payload: response.data });
};

export const fetchMyGames = (authentication) => async (dispatch) => {
  const response = await projects.get("/projects", {
    headers: {
      authorization: authentication,
    },
  });
  dispatch({ type: FETCH_MY_GAMES, payload: response.data });
};

export const fetchGame = (_id, authentication) => async (dispatch) => {
  const response = await projects.get(`/projects/${_id}`, {
    headers: {
      authorization: authentication,
    },
  });
  dispatch({
    type: FETCH_GAME,
    payload: response.data,
  });
};

export const editGame = (_id, formValues, authentication) => async (
  dispatch
) => {
  const response = await projects.patch(`/projects/${_id}`, formValues, {
    headers: {
      authorization: authentication,
    },
  });

  dispatch({ type: EDIT_GAME, payload: response.data });
  history.push("/projects");
};

export const deleteGame = (_id, authentication) => async (dispatch) => {
  await projects.delete(`/projects/${_id}`, {
    headers: {
      authorization: authentication,
    },
  });

  dispatch({ type: DELETE_GAME, payload: _id });
  history.push("/projects");
};

export const createScript = (_id, formValues, authentication) => async (
  dispatch
) => {
  const response = await projects.post(
    `/projects/${_id}/scripts`,
    { ...formValues },
    {
      headers: {
        authorization: authentication,
      },
    }
  );
  console.log(response.data);
  dispatch({ type: CREATE_SCRIPT, payload: response.data });
  history.push(`/projects/${_id}`);
};

export const fetchScripts = (_id, authentication) => async (dispatch) => {
  const response = await projects.get(`/projects/${_id}/scripts`, {
    headers: {
      authorization: authentication,
    },
  });
  console.log(response.data);
  dispatch({ type: FETCH_MY_SCRIPTS, payload: response.data });
};
