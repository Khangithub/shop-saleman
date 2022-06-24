import { Actions, ofType, createEffect, Effect } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "..";
import { UserService } from "src/app/services/auth.service";
import { lgPwd, lgSuc } from "../actions/user.actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { from } from "rxjs";

@Injectable()
export class UserEffect {
  constructor(
    private action: Actions,
    private store: Store<AppState>,
    private user_service: UserService
  ) {}

  lgPwdCall = createEffect(
    () => {
      return this.action.pipe(
        ofType(lgPwd),
        switchMap(({ email, password }) => {
          return from(this.user_service.lgPwd(email, password)).pipe(
            map(({ currentUser, token }) =>
              this.store.dispatch(lgSuc({ currentUser, token }))
            ),
            catchError((err): any => {
              console.log("err", err);
            })
          );
        })
      );
    },
    { dispatch: false }
  );
}
