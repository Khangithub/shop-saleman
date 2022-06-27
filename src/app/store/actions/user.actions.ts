import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user.model";

export const Types = {
  LOGIN_PWD: "[USER] login with password",
  LOGIN_SUC: "[USER] login successfully",
  SAVE_TOKEN: "[USER] save token",
  LOGIN_FAILED: "[USER] login failed",
};

export const lgPwd = createAction(
  Types.LOGIN_PWD,
  props<{ email: string; password: string }>()
);

export const saveToken = createAction(
  Types.SAVE_TOKEN,
  props<{ token: string }>()
)

export const lgSuc = createAction(
  Types.LOGIN_SUC,
  props<{ currentUser: User; token: string }>()
);

export const authFailed = createAction(Types.LOGIN_FAILED, props<{ errorMessage: string }>());
