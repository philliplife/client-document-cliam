import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { WebApiService } from './webapi.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private webapi: WebApiService
  ) { }

  login(username: string, password: string): Observable<string> {
    let url: string = environment.apiauthen;
    let action: string = 'login';
    let data = { 
      username: username,
      password: password,
      appname: environment.appCode
    };
    return this.webapi.post<string>(url, action, data);
  }

  token(username: string, password: string): Observable<string> {
    let url: string = environment.apiuseroauth;
    let action: string = 'token';
    let system_id = environment.system_id;
    let client_id = environment.client_id;
    let _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    }
    let data = "grant_type=password".concat("&username=",username,"&password=", password, "&client_id=", client_id, "&system_id=", system_id);
    return this.webapi.post<string>(url, action, data, _httpOptions);
  }
  
  refreshToken(refresh_token: string): Observable<string> {
    let url: string = environment.apiuseroauth;
    let action: string = 'token';
    let system_id = environment.system_id;
    let client_id = environment.client_id;
    let _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    }
    let data = "grant_type=refresh_token".concat("&client_id=", client_id, "&system_id=", system_id,"&refresh_token=", refresh_token);
    return this.webapi.post<string>(url, action, data, _httpOptions);
  }

  verifyAppToken(apptoken: string): Observable<any> {
    let url: string = environment.apiauthen;
    let action: string = 'verifyAppToken';
    let data = { 
      token: apptoken
    };
    return this.webapi.post<string>(url, action, data);
  }

  verifySysToken(username: string, systoken: string): Observable<any> {
    let url: string = environment.apiuseroauth;
    let action: string = 'token';
    let system_id = environment.system_id;
    let client_id = environment.client_id;
    let _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    }
    let data = "grant_type=password&username=".concat(username,"&password=", systoken, "&client_id=", client_id, "&system_id=", system_id);

    return this.webapi.post<string>(url, action, data, _httpOptions);
  }

  checktask(projt_id: string, username: string, tasks_id: string): Observable<boolean> {
    let url: string = environment.apiauthen;
    let action: string = 'checktask?projt_id='+projt_id+'&users_id='+username+'&tasks_id='+tasks_id;
    
    return this.webapi.get<boolean>(url, action);
  }
  //asyncronus function: wait until web api finish process
  async isAuthenticated(projt_id: string, username: string, tasks_id: string){
    let url: string = environment.apiauthen;
    let action: string = 'checktask?projt_id='+projt_id+'&users_id='+username+'&tasks_id='+tasks_id;
    let response = await this.webapi.get<boolean>(url, action).toPromise();

    return response;
  }

  validateMenues(projt_id: string, username: string, menues: any): Observable<any> {
    let url: string = environment.apiauthen;
    let action: string = 'validatemenues?projt_id='+projt_id+'&users_id='+username;

    return this.webapi.post<any>(url, action, menues);
  }

  async validateMenuesAsync(projt_id: string, username: string, menues: any) {
    let url: string = environment.apiauthen;
    let action: string = 'validatemenues?projt_id='+projt_id+'&users_id='+username;

    return await this.webapi.post<any>(url, action, menues).toPromise();
  }

  setSessionStorage(token: string, username: string, refresh_token: string) {
    sessionStorage.setItem(environment.tokenSessionId, btoa(token));
    sessionStorage.setItem(environment.userSessionId, btoa(btoa(username)));
    sessionStorage.setItem(environment.refreshTokenSessionId, btoa(refresh_token));
  }

  clearSessionStorage() {
    sessionStorage.clear();
  }
}
