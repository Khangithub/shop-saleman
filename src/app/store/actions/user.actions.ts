import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user.model";

export const Types = {
  LOGIN_PWD: "[USER] login with password",
  SAVE_CURRENT_USER_N_TOKEN_SUCCESSFUL: "[USER] save current user and token successful",
  SAVE_TOKEN: "[USER] save token",
  GET_CURRENT_USER: "[USER] get current user",
  GET_CURRENT_USER_SUCCESS: "[USER] get current user success",
  LOGIN_FAILED: "[USER] auth failed",
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

export const authFailed = createAction(Types.LOGIN_FAILED, props<{ errorMessage: string }>());
