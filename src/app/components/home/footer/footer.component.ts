import { Component, OnInit, VERSION } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  ng_version!: string;
  appCode!: string;
  appVersion!: string;

  constructor() { }

  ngOnInit(): void {
    this.ng_version = VERSION.full;
    this.appCode = environment.appCode;
    this.appVersion = environment.appVersion;
  }

}
