import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iquiry',
  templateUrl: './iquiry.component.html',
  styleUrls: ['./iquiry.component.css']
})
export class IquiryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    sessionStorage.setItem('chPage','2')
  }

}
