import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VERSION } from 'src/environments/version';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  ng_version = '13.3.12';
  appCode!: string;
  appVersion!: string;

  constructor() { }

  ngOnInit(): void {
    // this.ng_version = VERSION.full;
    this.appCode = environment.appCode;
    this.appVersion = VERSION.tag;
  }

}
