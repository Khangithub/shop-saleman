import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user.model";

export const Types = {
  LOGIN_PWD: "[USER] login with password",
  LOGIN_SUC: "[USER] login successfully",
  LOGIN_FAILED: "[USER] login failed",
};

export const lgPwd = createAction(
  Types.LOGIN_PWD,
  props<{ email: string; password: string }>()
);

export const lgSuc = createAction(
  Types.LOGIN_SUC,
  props<{ currentUser: User; token: string }>()
);

export const lgFail = createAction(Types.LOGIN_FAILED, props<{ error: any }>());
