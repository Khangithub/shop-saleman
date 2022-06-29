import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/auth.model";

export const Types = {
  LOGIN_PWD: "[AUTH] login with password",
  SAVE_CURRENT_USER_N_TOKEN_SUCCESSFUL: "[AUTH] save current user and token successful",
  SAVE_TOKEN: "[AUTH] save token",
  GET_CURRENT_USER: "[AUTH] get current user",
  GET_CURRENT_USER_SUCCESS: "[AUTH] get current user success",
  LOGIN_FAILED: "[AUTH] auth failed",
  REDIRECT_TO_LOGIN_PAGE: "[AUTH] redirect to login page"
};

export const loginWithEmailNPassword = createAction(
  Types.LOGIN_PWD,
  props<{ email: string; password: string }>()
);

export const getCurrentUser = createAction(Types.GET_CURRENT_USER)

export const saveToken = createAction(
  Types.SAVE_TOKEN,
  props<{ token: string }>()
)

export const saveCurrentUserNTokenSuccessful = createAction(
  Types.SAVE_CURRENT_USER_N_TOKEN_SUCCESSFUL,
  props<{ currentUser: User; token: string }>()
);

export const redirect2LoginPage = createAction(
  Types.REDIRECT_TO_LOGIN_PAGE,
)

export const authFailed = createAction(Types.LOGIN_FAILED, props<{ errorMessage: string }>());
