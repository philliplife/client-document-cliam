import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { inpClaimSearch } from '../../../../models/index';
import { ClaimService, ShareService } from '../../../../services/index';
import { resClaimSearch } from '../../../../models/index'
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { Router,ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {
  //SearchForm: FormGroup;
  submitted = false;
  private loading: boolean = false;
  public focusList: any = [
    { 'claim_no': true },
    { 'policy_type': true },
    { 'policy_no': true },
    { 'first_name': true },
    { 'last_name': true },
    { 'relation': true }
  ];
  SearchForm = new FormGroup({
    claim_no: new FormControl('', [Validators.required, Validators.minLength(3)]),
    policy_type: new FormControl('', Validators.required),
    policy_no: new FormControl('', [Validators.minLength(10)]),
    first_name: new FormControl('', [Validators.minLength(3)]),
    last_name: new FormControl('', [Validators.minLength(3)]),
    relation: new FormControl('', Validators.required)
  });
  //showBtSearch: boolean = true;
  frmData: any;
  showForm: boolean = false;
  public chPage:any;


  constructor(
    public fb: FormBuilder,
    public router: Router,
    public ClaimSRV: ClaimService,
    public shareSVC: ShareService,
    public route: ActivatedRoute

  ) {
    const id: string = route.snapshot.params.id;
    const url: string = route.snapshot.url.join('');
    const user = route.snapshot.data.user;
    console.log(route.snapshot.data.tasks_id)

    // this.SearchForm = this.fb.group({
    //   claim_no: '',
    //   policy_type: 'OB',
    //   policy_no: '',
    //   first_name: ['', Validators.required],
    //   last_name: '',
    //   relation: ''
    // });
  }


  ngOnInit(): void {

    let conSerch = {
      "claim_no": "",
      "policy_type": "",
      "policy_no": "",
      "first_name": "สักกะ",
      "last_name": "ธรรมสว่างสุข",
      "relation": "insured"
    }
    setTimeout(() => this.SearchForm.disable(), 100);
    // setTimeout(() => {
    //   this.ClaimSRV.claimLst(conSerch).pipe(
    //     finalize(() => {
    //       this.loading = false;
    //       // alert ('err')
    //     })

    //   ).subscribe((resp) => {
    //     this.loading = true;
    //     console.log('resp', resp)

    //   },
    //     (error: HttpErrorResponse) => {
    //       this.loading = false;
    //       const inptitle = 'Error';
    //       const inptext = error.message;
    //       const inpsts = error.status;
    //       this.shareSVC.errorSVC(inptitle, inptext, inpsts);

    //     })

    // }, 100);
  }
  onSubmit() {
    this.chPage = sessionStorage.getItem('chPage')

    // this.SearchForm.controls['claim_no'].enable()
    // this.SearchForm.controls['policy_type'].enable()
    // this.SearchForm.controls['policy_no'].enable()
    // this.SearchForm.controls['first_name'].enable()
    // this.SearchForm.controls['last_name'].enable()
    // this.SearchForm.controls['relation'].enable()
    this.loading = true
    this.submitted = true;
    let formData = this.SearchForm.value
    setTimeout(() => {
      this.loading = false
      if(this.chPage=='1'){
        this.router.navigate(['/home', 'claim', 'edit', 'showlist'], { queryParams: { srcdata: JSON.stringify(formData) } })
      }else {
        this.router.navigate(['/home', 'claim', 'iquiry'], { queryParams: { srcdata: JSON.stringify(formData) } })

      }
      //return this.showBtSearch = true
    }, 500);


  }
  get myForm() {
    return this.SearchForm.controls;
  }
  focusFunction(evt: any, inpTyp: any) {
    let data: any
    data = JSON.stringify(this.SearchForm.value);
    let data_ = JSON.parse(data)
    // console.log(data_.claim_no)


    switch (inpTyp) {
      case 'claim_no':
        this.SearchForm.controls['first_name'].disable();
        this.SearchForm.controls['first_name'].setValue('');
        this.SearchForm.controls['last_name'].disable();
        this.SearchForm.controls['last_name'].setValue('');
        this.SearchForm.controls['policy_type'].disable();
        this.SearchForm.controls['policy_no'].disable();
        // this.SearchForm.controls['first_name'].disable();
        // this.SearchForm.controls['last_name'].disable();
        this.SearchForm.controls['relation'].disable();
        // setTimeout(() => {
        //   this.SearchForm.controls['policy_type'].setValue('');
        //   this.SearchForm.controls['policy_no'].setValue('');
        //   this.SearchForm.controls['firs_name'].setValue('xxxx');
        //   this.SearchForm.controls['last_name'].setValue('');
        //   this.SearchForm.controls['relation'].setValue('');
        // }, 100);
        //   // ];

        // this.showSrchFn('1')
        // setTimeout(() => {
        //   this.showBtSearch = data_.claim_no?false:true;

        // }, 300);

        break
      case 'policy_no':
      case 'policy_type':
        this.SearchForm.controls['claim_no'].disable();
        this.SearchForm.controls['claim_no'].setValue('');
        this.SearchForm.controls['first_name'].disable();
        this.SearchForm.controls['first_name'].setValue('');
        this.SearchForm.controls['last_name'].disable();
        this.SearchForm.controls['last_name'].setValue('');
        this.SearchForm.controls['relation'].disable();
        this.SearchForm.controls['last_name'].setValue('');
        // this.showSrchFn('2')

        break;
      case 'first_name':
      case 'last_name':
      case 'relation':
        this.SearchForm.controls['claim_no'].disable();
        this.SearchForm.controls['claim_no'].setValue('');
        this.SearchForm.controls['policy_type'].disable();
        this.SearchForm.controls['policy_type'].setValue('');
        this.SearchForm.controls['policy_no'].disable();
        this.SearchForm.controls['policy_no'].setValue('');
        // this.showSrchFn('3')

        break;
      default:
    }
    // this.SearchForm.reset()

  }
  clearForm() {
    this.SearchForm.reset();
    this.SearchForm.controls['claim_no'].enable()
    this.SearchForm.controls['policy_type'].enable()
    this.SearchForm.controls['policy_no'].enable()
    this.SearchForm.controls['first_name'].enable()
    this.SearchForm.controls['last_name'].enable()
    this.SearchForm.controls['relation'].enable()
  }
  click(evt: any) {
    console.log('evt click', evt)

  }
  // showSrchFn(kind: any) {
  //   this.showBtSearch = true;
  //   switch (kind) {
  //     case '1':
  //     this.showBtSearch = this.SearchForm.controls['claim_no'].value?false:true;
  //       break
  //     case '2':
  //       break
  //     case '3':
  //       break
  //   }

  // }
  onSelected(val: any) {
    this.SearchForm.disable()
    if (val) {
      switch (val) {
        case 'เลขที่สินไหม':
          this.SearchForm.controls['claim_no'].enable();
          break
        case 'เลขกรมธรรม์':
          this.SearchForm.controls['policy_type'].enable()
          this.SearchForm.controls['policy_no'].enable()
          break
        case 'ชื่อ-สกุล':
          this.SearchForm.controls['first_name'].enable()
          this.SearchForm.controls['last_name'].enable()
          this.SearchForm.controls['relation'].enable()

      }

    }

  }

}

