import { Actions, ofType, createEffect, Effect } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { UserService } from "src/app/services/auth.service";
import { authFailed, lgPwd, lgSuc, saveToken } from "../actions/user.actions";
import { catchError, switchMap, tap } from "rxjs/operators";
import { from, of } from "rxjs";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { environment } from "src/environments/environment";

@Injectable()
export class UserEffect {
  constructor(
    private action: Actions,
    private user_service: UserService,
    private router: Router,
    private cookie_service: CookieService,
  ) { }

  lgPwdCall$ = createEffect(() =>
    this.action.pipe(
      ofType(lgPwd),
      switchMap(({ email, password }) =>
        from(this.user_service.lgPwd(email, password)).pipe(
          switchMap(
            (data => {
              if (data.hasOwnProperty('currentUser') && data.hasOwnProperty('token')) {
                return [lgSuc({ currentUser: data.currentUser, token: data.token }), saveToken({ token: data.token })]
              } else {
                throw data;
              }
            }),
          ),
          catchError(({ error }) => of(authFailed({ errorMessage: error.message })))
        )
      ),
    )
  );

  redirectLoginSuccess$ = createEffect(() => {
    return this.action.pipe(
      ofType(lgSuc),
      tap((_) => {
        this.router.navigate(['/'])
      })
    )
  }, { dispatch: false })

  saveToken$ = createEffect(() => {
    return this.action.pipe(
      ofType(saveToken),
      tap(({ token }) => {
        this.cookie_service.set(environment.TOKEN_NAME, token)
      })
    )
  }, { dispatch: false })
}
