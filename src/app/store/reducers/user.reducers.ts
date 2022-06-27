import { createReducer, on } from "@ngrx/store";
import { authFailed, lgSuc } from "../actions/user.actions";

const initialState = {
  currentUser: null,
  token: "",
  authError: null,
};

export const userReducer = createReducer(
  initialState,
  on(lgSuc, (state, { currentUser, token }) => ({
    ...state,
    currentUser,
    token,
  })),

  on(authFailed, (state, { errorMessage }) => (
    { ...state, authError: errorMessage }
  ))
);