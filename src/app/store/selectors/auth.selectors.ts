import { createSelector } from "@ngrx/store";
import { AppState } from "..";

export const userState = (state: AppState) => state.user;

export const selectUserState = createSelector(userState, (user) => user);
