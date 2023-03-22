import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ClaimService, ShareService, ErrServiceService } from '../../../../../services/index';





@Component({
  selector: 'app-editstd',
  templateUrl: './editstd.component.html',
  styleUrls: ['./editstd.component.css']
})


export class EditstdComponent implements OnInit {
  [x: string]: any;

  loading: boolean = false;
  claimDetail: any; // list of data from edit api that have both status 'A' and 'UnActive'
  files: File[] = [];
  selectedFiles?: FileList;
  selectedFile_?: any = [];
  progressInfos: any[] = [];
  //message: string[] = [];
  claimId: any;
  docDetail: any = [];
  pushDoc: string[] = [];
  cols_: any = [
    // { field: 'No', header: 'เลขที่สินไหม' },
    { field: 'document_name', header: 'File Name' },
    { field: 'document_description', header: 'File Description' },
    { field: 'document_status_text', header: 'สถานะ' }
  ];

  cols2: any = [
    { field: 'document_name', header: 'File Name' },
    { field: 'document_description', header: 'File Description' },
    { field: 'document_status_text', header: 'สถานะ' },
    { field: 'document_upload_date', header: 'วันที่อัพโหลด' },
    { field: 'document_upload_by', header: 'ผู้อัพโหลด' }
  ];
  listDocId: any = []; // list of documents to send to submit api
  //completeDocUp: any;
  //completeDocUp_: any = [];
  completeDocUp_Tb: any = []; // list of documents that was uploaded completed.
  detailDocSub: any; // list of documents that was submited into file-submit.
  showTbComplete: boolean = false;
  showTbPrepare: boolean = false;
  showBtUpload: boolean = false;
  showBtSub: boolean = false;
  showDetailSub = false;
  statusE: boolean = false;




  @ViewChild('dt1') dt1!: Table;
  @ViewChild('dt2') dt2!: Table;


  constructor(
    // private router: Router,
    private route: ActivatedRoute,
    public ClaimSRV: ClaimService,
    public shareSRV: ShareService,
    public errSrv: ErrServiceService
    // public ShareSRV9: SharedService

  ) { }

  ngOnInit(): void {
    this.docDetail = []

    this.loading = false
    //this.fileInfos = this.ShareSRV.getFiles();

    this.route.queryParams.subscribe(params => {
      // let srch = params.srcdata ? JSON.parse(params.srcdata) : '';
      this.claimId = params.srcdata
      this.callDataEdt(this.claimId);
    })
  }
  // handleFileInput(files: any) {
  //   // this.fileToUpload = files.item(0);
  // }
  async selectFiles(event: any) {
    //this.uploadAct = true;
    this.loading = true;
    let fd = new FormData();
    //this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    //const arrayFiles = Array.from(event.target.files)
    if (this.selectedFiles) {
      for (var i = 0, l = this.selectedFiles.length; i < l; i++) {
        fd.append('file_[]', this.selectedFiles[i])
      }
    }
    setTimeout(async () => {
      await this.uploadFiles(fd)
    }, 300);
  }
  async uploadFiles(fd: FormData) {
    this.loading = true;
    //this.message = [];
    let docid: any
    //fd.append('file', this.selectedFile_)
    fd.append('claim_no', this.claimId)
    this.ClaimSRV.verifyDoc(fd).pipe(
      finalize(() => {
        //this.loading = false;
      })
    ).subscribe(
      (resp: any) => {
        this.pushDoc = resp.documents;
        for (var i = 0, l = resp.documents.length; i < l; i++) {
          //  this.statusE = (resp.documents[i].document_status_code == 'E') ? true : false;
          docid = { document_id: resp.documents[i].document_id };
          this.listDocId.push(docid);
        }
        setTimeout(async () => {
          await this.showTable();
        }, 100);
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        const inptitle = 'Error';
        const inptext = error.message;
        const inpsts = error.status;
        this.errSrv._errMsg(inptitle, inptext, inpsts);
      });

    // if (this.selectedFiles) {
    //   for (let i = 0; i < this.selectedFiles.length; i++) {
    //     this.upload(i, this.selectedFiles[i]);
    //   }
    // }
  }
  // upload(idx: number, file: File) {
  //   let fd = new FormData();
  //   this.pushDoc = [];
  //   this.progressInfos[idx] = { value: 0, fileName: file.name };
  //   if (file) {
  //     fd.append('file', file)
  //     fd.append('claim_no', this.claimId)
  // this.ClaimSRV.verifyDoc(fd).subscribe(
  //   (event: any) => {
  //     console.log('event', event.documents)

  //     let docid = { document_id: event.documents[0].document_id }
  //     this.listDocId.push(docid)
  //     console.log('this.listDocId', this.listDocId)
  //     this.pushDoc = this.pushDoc.concat(event.documents)
  //     console.log('this.pushDoc', this.pushDoc)
  //     if (event.type === HttpEventType.UploadProgress) {
  //       this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
  //     } else if (event instanceof HttpResponse) {
  //       const msg = 'Uploaded the file successfully: ' + file.name;
  //       this.message.push(msg);
  //     }
  //   },
  //   (err: any) => {
  //     this.progressInfos[idx].value = 0;
  //     const msg = 'Could not upload the file: ' + file.name;
  //     this.message.push(msg);
  //   });
  //this.showTable()
  //   }
  // }
  async callDataEdt(claimId: any) {
    let docid: any;
    setTimeout(() => {
      this.ClaimSRV.edtClaim(claimId).pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe((resp) => {
        this.claimDetail = resp;
        if (this.claimDetail.documents.length > 0) {
          for (var i = 0, l = this.claimDetail.documents.length; i < l; i++) {
            if (this.claimDetail.documents[i].document_status_code == 'A') {
              this.completeDocUp_Tb.push(this.claimDetail.documents[i])
              this.showTbComplete = true;
            } else {
              this.docDetail.push(this.claimDetail.documents[i])
              //
              docid = { document_id: resp.documents[i].document_id }
              this.listDocId.push(docid)
              this.showTbPrepare = true;
              this.showBtUpload = true;
            }
          }
          //this.showTbComplete = true;
        } else {
          //this.showTbComplete = false;
        }
      },
        (error: HttpErrorResponse) => {
          this.loading = false;
          const inptitle = 'Error';
          const inptext = error.message;
          const inpsts = error.status;
          this.errSrv._errMsg(inptitle, inptext, inpsts)


        })

    }, 300);
  }

  async showTable() {
    setTimeout(() => {
      this.loading = false;
      this.docDetail = (this.docDetail?.length) ? this.docDetail.concat(this.pushDoc) : this.pushDoc;
      console.log('this.docDetail', this.docDetail)
      console.log('this.pushDoc', this.pushDoc)
      this.showTbPrepare = true;
      this.showBtUpload = true
       setTimeout(async () => {
        await this.checkBtUpload()
       }, 300)
    }, 500);

  }

  async confirmUpload() {
    this.loading = true;
    let data = {
      claim_no: this.claimId,
      documents: this.listDocId
    }
    this.ClaimSRV.uploadDoc(data).pipe(
      finalize(() => {
        this.loading = false;
        this.showTbComplete = true;
      })
    ).subscribe((resp:any) => {
      this.docDetail = [];
      let fileUploaded = resp.documents;
      // this.completeDocUp_ = resp.documents;
      if (this.completeDocUp_Tb.length > 0) {
        this.completeDocUp_Tb = this.completeDocUp_Tb.concat(fileUploaded)
      } else {
        this.completeDocUp_Tb = fileUploaded;
      }
      this.showBtSub = true;
      this.showBtUpload = false;
      this.showTbPrepare = false;
      console.log('this.completeDocUp_Tb',this.completeDocUp_Tb)
    }, (error) => {
      this.loading = false;
      const inptitle = 'Error';
      const inptext = error.message;
      const inpsts = error.status;
      this.errSrv._errMsg(inptitle, inptext, inpsts)

    })
  }
  submitDoc() {
    this.loading = true;
    // this.uploadAct = true;
    let data = {
      claim_no: this.claimId
    }
    setTimeout(() => {

      this.ClaimSRV.subDoc(data).pipe(
        finalize(() => {
          //this.uploadAct = false;
          this.loading = false;
        })
      ).subscribe((resp: any) => {

        this.detailDocSub = resp;
        this.showDetailSub = true;
        this.showBtSub = false;
        this.showTbComplete = false;
        this.cancelverify();

      },
        (error: HttpErrorResponse) => {
          const inptitle = 'Error';
          const inptext = error.message;
          const inpsts = error.status;
          this.errSrv._errMsg(inptitle, inptext, inpsts)


        })
    }, 300);

  }
  cancelverify() {
    let data = {
      'claim_no': this.claimId

    }
    this.ClaimSRV.cancelverify(data).pipe(

    ).subscribe((resp2) => {
      this.docDetail = '';
      this.pushDoc = [];
      this.listDocId = [];
      this.showTbPrepare = false;

    }, (error: HttpErrorResponse) => {
      this.loading = false;
      const inptitle = 'Error';
      const inptext = error.message;
      const inpsts = error.status;
      this.errSrv._errMsg(inptitle, inptext, inpsts)


    })
  }
  deletDoc(ri: any) {
    Swal.fire({
      title: 'คุณยืนยันต้องการลบข้อมูลนี้ใช่หรือไม่?',
      //text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.delFn(ri)
      }
    })

  }
  delFn(ri: any) {
    this.loading = true;
    let docDel = this.completeDocUp_Tb[ri].document_id
    let data = {
      'document_id': docDel
    }
    setTimeout(() => {
      this.ClaimSRV.deleteDoc(data).pipe(
        finalize(() => {
          this.loading = false;

        })

      ).subscribe((resp) => {

        console.log('delete result', resp)
        this.completeDocUp_Tb.splice(ri, 1);
        console.log('ri', this.completeDocUp_Tb)
      }, (error: HttpErrorResponse) => {
        this.loading = false;
        const inptitle = 'Error';
        const inptext = error.message;
        const inpsts = error.status;
        this.errSrv._errMsg(inptitle, inptext, inpsts)


      })

    }, 300);

  }
  async checkBtUpload() {
    // console.log('this.docDetail',this.docDetail)
    // if(this.docDetail.documents?.length){
    //   for (var i = 0, l = this.docDetail.documents.length; i < l; i++) {
    //     this.statusE = (this.docDetail.documents[i].document_status_code == 'E') ? true : false;
    //   }

    // }
    let arrs: any[] = this.docDetail
    console.log(arrs)
    const result = arrs.filter((arr) => {
      console.log(arr.document_status_code)
      return arr.document_status_code == 'E'

    })
    console.log('result', result)
    this.statusE = (result.length > 0) ? true : false;

  }


  openPDF(id: any,docname:any,document_type:any,claim_no:any) {

    console.log('open', id)

    setTimeout(() => {
      if (document_type == "40") {
        let data = {
          //document_id: evt.data.document_id
          claim_no:claim_no,
          report_version: "2"
          
        }
        this.ClaimSRV.openFaxDoc(data).pipe(

          ).subscribe((resp) => {

            this.shareSRV.openBlob(resp, id)
          },
            (error: HttpErrorResponse) => {
              this.loading = false;
              const inptitle = 'Error';
              const inptext = error.message;
              const inpsts = error.status;
              this.errSrv._errMsg(inptitle, inptext, inpsts)
            })
      }else if(document_type =="50"){
        let data = {
          //document_id: evt.data.document_id
          claim_no:claim_no
        }
        this.ClaimSRV.openApproveDoc(data).pipe(

          ).subscribe((resp) => {

            this.shareSRV.openBlob(resp, id)
          },
            (error: HttpErrorResponse) => {
              this.loading = false;
              const inptitle = 'Error';
              const inptext = error.message;
              const inpsts = error.status;
              this.errSrv._errMsg(inptitle, inptext, inpsts)
            })
      }else{
        let data = {
          //document_id: evt.data.document_id
          document_id:id
        }
        this.ClaimSRV.openDoc(data).pipe(

          ).subscribe((resp) => {

            this.shareSRV.openBlob(resp, docname)
          },
            (error: HttpErrorResponse) => {
              this.loading = false;
              const inptitle = 'Error';
              const inptext = error.message;
              const inpsts = error.status;
              this.errSrv._errMsg(inptitle, inptext, inpsts)
            })
      }

    }, 500);
  }

}
// edtClaim
