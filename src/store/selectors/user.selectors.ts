import { createSelector } from "@ngrx/store";
import { AppState } from "..";

export const userState = (state: AppState) => state.user;

export const selectCurrentUser = createSelector(userState, (user) => user);
