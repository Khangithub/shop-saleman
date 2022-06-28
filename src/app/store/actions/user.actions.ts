import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user.model";

export const Types = {
  LOGIN_PWD: "[USER] login with password",
  LOGIN_SUC: "[USER] login successfully",
  SAVE_TOKEN: "[USER] save token",
  GET_CURRENT_USER: "[USER] get current user",
  LOGIN_FAILED: "[USER] login failed",
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

export const lgSuc = createAction(
  Types.LOGIN_SUC,
  props<{ currentUser: User; token: string }>()
);

export const authFailed = createAction(Types.LOGIN_FAILED, props<{ errorMessage: string }>());
