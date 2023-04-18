import { HttpErrorResponse } from '@angular/common/http';
// import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import { VERSION } from 'src/environments/version';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  //--------------------------------
  //Declare variable
  //--------------------------------
  showLogin: boolean = true;
  appName!: string;
  appVersion!: string;
  appCode!: string;
  appRegion!: string;
  message!: string;
  loading: boolean = false;
  dataLoading: boolean = false;
  rForm!: FormGroup;

  instruction!: boolean;

  username: string = '';
  password: string = '';

  sub_login!: Subscription;
  //--------------------------------

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.appName = environment.appName;
    this.appVersion = VERSION.tag;
    this.appCode = environment.appCode;
    this.appRegion = environment.appRegion;
    environment.token = '';

    if (environment.system_id == '99999999-9999-9999-9999-999999999999') {
      this.instruction = true;
    }
    
    this.titleService.setTitle(environment.appCode);

    this.validateToken();
  }

  validateToken() {
    //if found querystring "token" in the url, use it to verify and generate token authomatically.
    //else use login screen to manual login
    this.route.queryParams.subscribe(params => {
      if (!params.token && !params.systoken) {
        this.showLogin = true;
        this.rForm = this.formBuilder.group({
          'username': [null, Validators.required],
          'password': [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(50)])]
        });
      } else {
        this.loading = true;
        this.showLogin = false;

        //custom
        if (params.token) {
          // this.apptoken(params);
        }
        // console.log(params.systoken)
        //bearer (oauth)
        if (params.systoken) {
          this.systoken(params);
        }
      }

    })
  }

  apptoken(params: any) {
    this.loginService.verifyAppToken(params.token)
      .pipe(finalize(() => {
        this.dataLoading = false;
        // this.loading = false;
        this.enableForm(true);
      }))
      .subscribe((response) => {
        if (response.StatusCode === "200") {
          this.username = response.UserId;
          this.username = this.username.length > 10 ? this.username.substring(0, 10) : this.username;
          environment.token = response.Token;
          environment.refresh_token = "";
          environment.token_type = "Custom";
          this.loginService.checktask(environment.appCode, this.username, 'HOME')
            .subscribe(response => {
              if (response == true) {
                environment.username = this.username;
                this.loginService.setSessionStorage(environment.token, this.username, environment.refresh_token);
                this.loginService.validateMenues(environment.appCode, this.username, environment.menues)
                  .subscribe(response => {
                    environment.menues = response;
                    environment.menuesValidated = true;
                    this.router.navigateByUrl('/home/main');
                  }, (error: HttpErrorResponse) => {
                    let err = error;
                    this.message = err.message;
                    this.loading = false;
                  });
              } else {
                this.router.navigateByUrl('/login');
              }
            })
        } else {
          this.router.navigateByUrl('/login');
        }
      }, (error) => {
        let err = error; // this.loginService.GetError(error);
        this.message = err.message;
        this.loading = false;
      });
  }
  
  systoken(params:any) {
    let username = params.u;
    username = username.replace(/%3D/g, "=");
    username = atob(username);
    this.loginService.verifySysToken(username, params.systoken)
      .pipe(finalize(() => {
        this.dataLoading = false;
        // this.loading = false;
        this.enableForm(true);
      }))
      .subscribe((response) => {
        this.username = response.userName;
        this.username = this.username.length > 10 ? this.username.substring(0, 10) : this.username;
        environment.token = response.access_token;
        environment.refresh_token = response.refresh_token;
        environment.token_type = response.token_type;
        this.loginService.checktask(environment.appCode, this.username, 'HOME')
          .subscribe(response => {
            if (response == true) {
              environment.username = this.username;
              this.loginService.setSessionStorage(environment.token, this.username, environment.refresh_token);
              this.loginService.validateMenues(environment.appCode, this.username, environment.menues)
                .subscribe(response => {
                  environment.menues = response;
                  environment.menuesValidated = true;
                  this.router.navigateByUrl('/home/main');
                }, (error: HttpErrorResponse) => {
                  let err = error;
                  this.message = err.message;
                  this.loading = false;
                });
            } else {
              this.router.navigateByUrl('/login');
            }
          })
      }, (error) => {
        let err = error; // this.loginService.GetError(error);
        this.message = err.message;
        this.loading = false;
      });
  }

  login_submit(post: any) {
    if (environment.token_type.toLowerCase() == "custom") {
      this.login(post);
    } else {
      this.oauth(post);
    }
  }

  login(post: any) {
    this.message = "";
    this.enableForm(false);
    this.dataLoading = true;
    this.username = post.username.toUpperCase();
    this.password = post.password;

    this.sub_login = this.loginService.login(this.username, this.password)
    .pipe(finalize(() => {
      this.dataLoading = false;
      this.enableForm(true);
    }))
    .subscribe(
      (response) => {
        this.loginSuccess(response);
      }, (error) => {
        let err = error; // this.loginService.GetError(error);
        this.message = err.message;
      }
    );
  }

  //bearer (oauth)
  oauth(post: any) {
    this.message = "";
    this.enableForm(false);
    this.dataLoading = true;
    this.username = post.username.toUpperCase();
    this.password = post.password;

    this.sub_login = this.loginService.token(this.username, this.password)
      .pipe(finalize(() => {
        this.dataLoading = false;
        this.enableForm(true);
      }))
      .subscribe(
        (response) => {
          this.tokenSuccess(response);
        }, (error) => {
          let err = error; // this.loginService.GetError(error);
          this.message = err.message;
        }
      );
  }

  private loginSuccess(response: any) {
    // let str = response;
    let res = JSON.stringify(response);
    this.username = this.username.length > 10 ? this.username.substring(0, 10) : this.username;
    environment.token = response;
    environment.refresh_token = "";
    environment.token_type = "Custom";
    this.loginService.checktask(environment.appCode, this.username, 'HOME')
      .subscribe(response => {
        this.checktaskSuccess(response, environment.token);
      }, (error) => {
        let err = error; // this.loginService.GetError(error);
        this.message = err.message;
      });
  }

  private tokenSuccess(response: any) {
    this.loading = true;
    this.username = response.userName;
    this.username = this.username.length > 10 ? this.username.substring(0, 10) : this.username;
    environment.token = response.access_token;
    environment.refresh_token = response.refresh_token;
    environment.token_type = response.token_type;
    this.loginService.checktask(environment.appCode, this.username, 'HOME')
      .subscribe(response => {
        this.checktaskSuccess(response, environment.token);
      }, (error) => {
        let err = error; // this.loginService.GetError(error);
        this.message = err.message;
        this.loading = false;
      });
  }

  private checktaskSuccess(response: any, token: string) {
    if (response == true) {
      environment.username = this.username;
      const refresh_token = environment.refresh_token;
      this.loginService.setSessionStorage(token, this.username, refresh_token);
      this.loginService.validateMenues(environment.appCode, this.username, environment.menues)
        .subscribe(response => {
          environment.menues = response;
          environment.menuesValidated = true;
          this.router.navigateByUrl('/home/main');
        }, (error: HttpErrorResponse) => {
          let err = error;
          this.message = err.message;
        });
    } else {
      this.message = 'You can not access this system.';
    }
  }

  enableForm(enable: boolean) {
    if (this.showLogin) {
      if (enable) {
        this.rForm.controls["username"].enable();
        this.rForm.controls["password"].enable();
      } else {
        this.rForm.controls["username"].disable();
        this.rForm.controls["password"].disable();
      }
    }
  }

  ngOnDestroy() {
    if (this.sub_login) {
      this.sub_login.unsubscribe();
    }
  }

}
