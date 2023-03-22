import { Component, OnInit, ViewChild } from '@angular/core';
import { ClaimService } from '../../../../../services/index';
import { resClaimSearch, inpClaimSearch } from '../../../../../models/index'
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Table } from 'primeng/table';
import { MenuItem, PrimeIcons } from 'primeng/api';
@Component({
  selector: 'app-listclaim',
  templateUrl: './listclaim.component.html',
  styleUrls: ['./listclaim.component.scss']
})
export class ListclaimComponent implements OnInit {
  [x: string]: any;
  public subscript: Subscription = new Subscription;
  // public claimLst_: resClaimSearch | undefined;
  public claimLst_: any
  public obj: any;
  public srcData!: inpClaimSearch;
  public cols_: any;
  public loading: boolean = false;
  @ViewChild('dt') dt!: Table;
  showIntro:boolean = false;



  constructor(
    public ClaimSRV: ClaimService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //this.loading = true;
    // let Obj = this.route.snapshot.paramMap.get('my_object');

    this.route.queryParams.subscribe(params => {
      let srch = params.srcdata ? JSON.parse(params.srcdata) : '';
      if (srch) {
        this.srcData = {
          "claim_no": srch.claim_no,
          "policy_type": srch.policy_type,
          "policy_no": srch.policy_no,
          "first_name": srch.first_name,
          "last_name": srch.last_name,
          "relation": srch.relation
          // "claim_no": "",
          // "policy_type": "OB",
          // "policy_no":"1001004337",
          // "first_name": "",
          // "last_name": "",
          // "relation": ""
        }
        setTimeout(() => {
          this.loading = true;
          this.callList(this.srcData)
          this.showIntro = false;

        }, 200);
      } else {
this.showIntro = true;

      }


    });

    // this.subscript = this.ClaimSRV.claimLst(this.srcData)
    //   .subscribe((resp) => {
    //     this.claimLst_ = resp
    //   })




  }
  applyFilterGlobal(event: Event, stringVal: any) {
    this.dt.filterGlobal((event.target as HTMLInputElement).value, stringVal);
  }


  callList(data: any) {
    this.srcData = data
    setTimeout(() => {
      this.ClaimSRV.claimLst(this.srcData).pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe((resp) => {
        this.loading = true;
        this.claimLst_ = resp.data
        this.cols_ = [
          { field: 'claim_no', header: 'เลขที่สินไหม' },
          { field: 'policy_type', header: 'ประเภทกรมธรรม์' },
          { field: 'policy_no', header: 'เลขกรมธรรม์' },
          { field: 'owner_first_name', header: 'ชื่อผู้ถือกรมธรรม์' },
          { field: 'owner_last_name', header: 'นามสกุลผู้ถือกรมธรรม์' },
          { field: 'insured_first_name', header: 'ชื่อผู้เอาประกัน' },
          { field: 'insured_last_name', header: 'นามสกุลผู้เอาประกัน' },
          { field: 'claim_status', header: 'สถานะสินไหม' },
          { field: 'docushare_submit', header: 'Doc. Submit' }
        ];

      })

    }, 800);
  }
  // editDoc(claimId:any,status_sub:any){
  //   if(status_sub==false || status_sub =='false'){
  //     setTimeout(() => {
  //       this.loading = false
  //       this.router.navigate(['/home', 'claim', 'edit','editstd'], { queryParams: { srcdata: claimId } })
  //     }, 500)

  //   }else {
  //     alert('View Mode')

  //   }
  //  ;
  // }
  onRowSelect(evt:any){
   let claimId = evt.data.claim_no;
   let stdSub = evt.data.docushare_submit;
   if(stdSub==false || stdSub =='false'){
    setTimeout(() => {
      this.loading = false
      this.router.navigate(['/home', 'claim', 'edit','editstd'], { queryParams: { srcdata: claimId } })
    }, 500)

  }else {
    this.router.navigate(['/home', 'claim', 'edit','view'], { queryParams: { srcdata: claimId } })

  }
  }
}
