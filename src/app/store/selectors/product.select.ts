import { createSelector } from "@ngrx/store";
import { AppState } from "..";

export const productState = (state: AppState) => state.product;

export const selectProductStore = createSelector(productState, (product) => product);
