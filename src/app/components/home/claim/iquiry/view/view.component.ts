import { Component, OnInit, Input, Output, EventEmitter, ViewChild, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClaimService, ShareService } from '../../../../../services/index';
import { Table } from 'primeng/table';
import { finalize, throttleTime } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  claimId: any;
  viewClaimData: any;
  submitData: any = [];
  docDatas: any = [];
  detailFile: boolean = false;
  reasonUnsub: any;
  checkUnSub:boolean =  false;
  loading:boolean = false;


  constructor(
    private route: ActivatedRoute,
    public ClaimSRV: ClaimService,
    public shareSRV: ShareService,

  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // let srch = params.srcdata ? JSON.parse(params.srcdata) : '';
      this.claimId = params.srcdata
      this.viewDoc(this.claimId);
    })

  }
  viewDoc(claimId: any) {
    setTimeout(() => {
      this.ClaimSRV.viewDoc(claimId).pipe(

      ).subscribe((resp) => {
        this.viewClaimData = resp;
        this.submitData = this.viewClaimData.submits
        console.log(this.viewClaimData);

      })

    }, 300);
  }
  onRowSelect(evt: any) {
    setTimeout(() => {
      console.log('evt', evt)
      this.docDatas = evt.data.documents
      this.checkUnSub = evt.data.status_code=='U'?false:true;
      this.detailFile = true;
      console.log(this.docDatas)

    }, 500);
  }

  openPDF(evt: any) {

    console.log('open', evt)
    let data = {
      document_id: evt.data.document_id
    }
    setTimeout(() => {
      this.ClaimSRV.openDoc(data).pipe(

      ).subscribe((resp) => {
        this.shareSRV.openBlob(resp, evt.data.document_name)
      },
        (error) => {
          console.log('getPDF error: ', error);
        })

    }, 500);
  }

  viewSubPDF(id:any){
    let data = {
      "submit_id": id
    }
    setTimeout(() => {
      this.ClaimSRV.openDocShare(data).pipe(

      ).subscribe((resp) => {
        this.shareSRV.openBlob(resp, id)
      })

    }, 500);

  }
  Unsub() {
    this.alertMsg();

  }
  remove(){

    this.loading = true;
    let data = {
      "claim_no": this.claimId,
      "unsubmit_reason": this.reasonUnsub
    }
    setTimeout(() => {
      this.ClaimSRV.unSubmit(data).pipe(
        finalize(() => {

          this.detailFile = false;
          this.viewDoc(this.claimId)
          this.loading = false;

        })

      ).subscribe((resp) => {
        console.log('unsub', resp)

      })

    }, 500);
  }

  alertMsg() {
    Swal.fire({
      title: 'คุณยืนยันต้องการยกเลิกเอกสารนี้ใช่หรือไม่?',
      //text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
        this.remove();
      }
    })

  }
}

