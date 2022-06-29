import { createReducer, on } from "@ngrx/store";
import { authFailed, saveCurrentUserNTokenSuccessful } from "../actions/user.actions";

const initialState = {
  currentUser: null,
  token: "",
  authError: null,
};

export const userReducer = createReducer(
  initialState,
  on(saveCurrentUserNTokenSuccessful, (state, { currentUser, token }) => ({
    ...state,
    currentUser,
    token,
    authError: null
  })),

  on(authFailed, (state, { errorMessage }) => (
    { ...state, authError: errorMessage }
  ))
);