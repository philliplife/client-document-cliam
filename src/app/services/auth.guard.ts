import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    //state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let tasks_id = route.data["tasks_id"]; //รับ tasks id มาจาก data ที่กำหนดจาก route
    console.log('route',route)
    let username = sessionStorage.getItem(environment.userSessionId);
    let token = sessionStorage.getItem(environment.tokenSessionId);
    let refresh_token = sessionStorage.getItem(environment.refreshTokenSessionId);

    //if not defind tasks_id, it will retreive from route name sush as "/home/main" --> "main"
    if (!tasks_id) {
      let arr = state.url.split('/');
      tasks_id = arr[arr.length - 1];
    }
    if (!(username && token)) {
      this.router.navigateByUrl('/login');
      return false;
    }

    environment.username = username ? atob(atob(username)) : '';
    environment.token = token ? atob(token) : '';
    environment.refresh_token = refresh_token ? atob(refresh_token) : '';

    let isAuthenticated: boolean;
    try {
      isAuthenticated = await this.loginService.isAuthenticated(environment.appCode, environment.username, tasks_id);
    } catch (err) {
      sessionStorage.clear();
      isAuthenticated = false;
    }

    if (isAuthenticated) {
      if (!environment.menuesValidated) {
        environment.menues = await this.loginService.validateMenuesAsync(environment.appCode, environment.username, environment.menues);
        environment.menuesValidated = true;
      }
      return true;
    } else {
      this.router.navigateByUrl('/home/unauthen');
      return false;
    }
  }
}
