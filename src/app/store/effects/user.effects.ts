import { Actions, ofType, createEffect, Effect } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { UserService } from "src/app/services/auth.service";
import { catchError, switchMap, tap } from "rxjs/operators";
import { from, of } from "rxjs";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { environment } from "src/environments/environment";
import { saveToken, loginWithEmailNPassword, saveCurrentUserNTokenSuccessful, redirect2LoginPage, authFailed } from "../actions/auth.actions";

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
      ofType(loginWithEmailNPassword),
      switchMap(({ email, password }) =>
        from(this.user_service.loginWithEmailNPassword(email, password)).pipe(
          switchMap(
            (data => {
              if (data.hasOwnProperty('currentUser') && data.hasOwnProperty('token')) {
                return [saveCurrentUserNTokenSuccessful({ currentUser: data.currentUser, token: data.token }), saveToken({ token: data.token })]
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
      ofType(redirect2LoginPage),
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
