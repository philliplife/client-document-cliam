import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  appName!: string;
  appVersion!: string;

  constructor() { }

  ngOnInit(): void {
    this.appName = environment.appName; // this.appGlobals.GC_APP_NAME;
    this.appVersion = environment.appVersion; // this.appGlobals.GC_APP_VERSION;
 
  }

}
