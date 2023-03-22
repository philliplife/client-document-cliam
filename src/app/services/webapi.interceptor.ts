import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';

import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { BehaviorSubject, empty, Observable, throwError } from 'rxjs';

import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private loginService: LoginService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const authReq = this.addAuthenticationToken(request);

        return next.handle(authReq).pipe(catchError((event) => {
            //if error from token, throw error.
            if (authReq.url.includes("token")) {
                if (event instanceof HttpErrorResponse) {
                    let error = this.GetError(event);
                    return throwError(error); //angular7
                }
            }

            //if web api response code is 401, the access token expired.
            //following code will call refresh token, feature of oauth2, and retry web api again.
            if (event.status === 401 && environment.token_type.toLowerCase() === "bearer") {
                //only bearer authentication type.
                if (event.error.message.toLowerCase() === "the access token expired") {
                    //when the access token expired
                    if (this.refreshTokenInProgress) {
                        // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
                        // which means the new token is ready and we can retry the request again
                        return this.refreshTokenSubject.pipe(
                            filter(result => result !== null),
                            take(1),
                            switchMap(() => next.handle(this.addAuthenticationToken(request)))
                        );
                    } else {
                        this.refreshTokenInProgress = true;
                        // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
                        this.refreshTokenSubject.next(null);
                        var token = sessionStorage.getItem(environment.refreshTokenSessionId);
                        var refresh_token: string
                        if (token) {
                            refresh_token = atob(token);
                            return this.refreshAccessToken(refresh_token).pipe(
                                switchMap((response) => {
                                    // set renew token to environment variables.
                                    environment.token = response.access_token;
                                    environment.refresh_token = response.refresh_token;
                                    environment.token_type = response.token_type;
                                    // set renew token to sessionstorage
                                    this.loginService.setSessionStorage(environment.token, environment.username, environment.refresh_token);
                                    this.refreshTokenSubject.next(response);
                                    // recall web api again, when refresh token has already finished.
                                    return next.handle(this.addAuthenticationToken(request));
                                }),
                                catchError(err => this.handleError(err)),
                                // When the call to refreshToken completes we reset the refreshTokenInProgress to false
                                // for the next time the token needs to be refreshed
                                finalize(() => this.refreshTokenInProgress = false)
                            );
                        }
                    }
                } else {
                    if (event instanceof HttpErrorResponse) {
                        let error = this.GetError(event);
                        return throwError(error);
                    }
                }
            }
            this.handleAuthError(event)
            return new Observable<HttpEvent<any>>();
        }));
    }

    private handleError(error: HttpErrorResponse) {

        console.log('error',error);
        this.loginService.clearSessionStorage();
        this.router.navigateByUrl('/home/unauthen');
        return empty();
      }
      private handleAuthError(err: HttpErrorResponse): Observable<any> {
        //handle your auth error or rethrow
            // if (err.status === 401 || err.status === 403) {
            //   this.router.navigateByUrl('/login');
            //   return observableOf(err.message);
            // }
        let error = this.GetError(err);
        return observableThrowError(error);
      }

    private refreshAccessToken(refresh_token: string): Observable<any> {
        // return of("secret token");
        return this.loginService.refreshToken(refresh_token);
    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        let _httpOptions = { headers: request.headers }
        if (!request.headers.has('Content-Type')) {
            // not defined any Content-Type, will be 'application/json'
            _httpOptions.headers = _httpOptions.headers.append('Content-Type', 'application/json');
        } else {
            if (request.headers.get('Content-Type') === 'undefined') {
                _httpOptions.headers = _httpOptions.headers.delete('Content-Type');
            }
        }

        _httpOptions.headers = _httpOptions.headers.append('Authorization', environment.token_type + ' ' + environment.token);
        //console.log(JSON.stringify(_httpOptions.headers.get('Content-Type')));
        return request.clone(_httpOptions);
    }

    GetError(response: any): HttpErrorResponse {
        if (!response) {
            return response;
        }
        let err = response;
        err.status = response.status;
        err.statusText = response.statusText;
        err.ModelState = {};
        switch (response.status) {
            case 0:
                err.message = 'Network Error!!!';
                break;
            case 422:
                let error = response.error;
                err.ModelState = error.ModelState;
                err.message = this.get422Message(error);
                break;
            default:
                //  console.log(response);
                if (response.error && response.error.message) {
                    err.message = response.error.message;
                } else if (response.error && response.error.Message) {
                    err.message = response.error.Message;
                } else if (response.error && response.error.error_description) {
                    err.message = response.error.error_description;
                } else {
                    err.message = err.statusText;
                }
                break;
        }

        return err;
    }

    private get422Message(response: any) {
        if (response.ModelState) {
            var keys = Object.keys(response.ModelState);
            var msg = '';
            msg = '<ul>';
            for (var i = 0; i < keys.length; i++) {
                msg = msg + '<li>' + response.ModelState[keys[i]] + '</li>';
            }
            msg = msg + '</ul>'
            msg = msg;
            return msg;
        } else {
            return '';
        }
    }
}

function observableThrowError(error: HttpErrorResponse): Observable<any> {
    // throw new Error('Function not implemented.');
    throw error
}

