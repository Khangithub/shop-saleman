import { Actions, ofType, createEffect } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { UserService } from "src/app/services/auth.service";
import { authFailed, getCurrentUser, loginWithEmailNPassword, redirect2LoginPage, saveCurrentUserNTokenSuccessful, saveToken } from "../actions/auth.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
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
  
  // Login action
  loginWithEmailNPassword$ = createEffect(() =>
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
  )

  redirectLoginSuccess$ = createEffect(() =>
    this.action.pipe(
      ofType(saveCurrentUserNTokenSuccessful),
      tap((_) => this.router.navigate(['/']))
    ), { dispatch: false })

  saveToken$ = createEffect(() =>
    this.action.pipe(
      ofType(saveToken),
      tap(({ token }) => this.cookie_service.set(environment.TOKEN_NAME, token))
    ), { dispatch: false })

  // Get current user action
  getCurrentUser$ = createEffect(() =>
    this.action.pipe(
      ofType(getCurrentUser),
      switchMap(() =>
        from(this.user_service.getCurrentUser()).pipe(
          map(
            (data => {
              if (data.hasOwnProperty('currentUser') && data.hasOwnProperty('token')) {
                return saveCurrentUserNTokenSuccessful({ currentUser: data.currentUser, token: data.token })
              } else {
                throw data;
              }
            }),
          ),
          catchError((errorMessage: string) => of(authFailed({ errorMessage }), redirect2LoginPage()))
        ))))
  
        
  redirect2LoginPage$ = createEffect(() =>
  this.action.pipe(
    ofType(redirect2LoginPage),
    tap((_) => this.router.navigate(['/login']))
  ), { dispatch: false })
}
