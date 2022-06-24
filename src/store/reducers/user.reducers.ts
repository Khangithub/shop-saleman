import { createReducer, on } from "@ngrx/store";
import { lgSuc } from "../actions/user.actions";

const initialState = {
  currentUser: null,
  token: "",
};

export const userReducer = createReducer(
  initialState,
  on(lgSuc, (state, { currentUser, token }) => ({
    ...state,
    currentUser,
    token,
  }))
);
