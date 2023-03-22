import { Component, OnInit } from '@angular/core';
// import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-unauthen',
  templateUrl: './unauthen.component.html',
  styleUrls: ['./unauthen.component.css']
})
export class UnauthenComponent implements OnInit {
  username!: string;

  constructor() { }

  ngOnInit(): void {
    // this.username = environment.username;
  }

}
