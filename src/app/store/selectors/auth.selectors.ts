import { createSelector } from "@ngrx/store";
import { AppState } from "..";

export const userStore = (state: AppState) => state.user;

export const selectUserStore = createSelector(userStore, (user) => user);
