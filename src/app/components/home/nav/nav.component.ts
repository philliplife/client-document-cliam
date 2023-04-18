import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { VERSION } from 'src/environments/version';
import swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  username!: string;
  menues!: Array<any>;
  appName!: string;
  appVersion!: string;
  appRegion!: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.username = environment.username; //this.appGlobals.GV_USER_ID;
    this.appName = environment.appName; // this.appGlobals.GC_APP_NAME;
    this.appVersion = VERSION.tag; // this.appGlobals.GC_APP_VERSION;
    this.menues = environment.menues; // this.appGlobals.GV_MENUES;
    this.appRegion = environment.appRegion;
  }

  logout() {
    swal.fire({
      title: 'Confirm',
      text: 'Do you want to signoff ?',
      icon: 'warning',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      reverseButtons: true,
      preConfirm: () => {
        sessionStorage.clear();
        environment.username = '';
        environment.token = '';
        environment.refresh_token = '';
        // this.router.navigateByUrl('home/signoff');
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(null);
          }, 1000)
        })
      }
    }).then((response) => {
      // console.log(response)
      if (response.isConfirmed) {
        this.router.navigateByUrl('home/signoff');
      }
    });
  }

}
