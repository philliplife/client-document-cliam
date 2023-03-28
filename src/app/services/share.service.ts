import { Injectable } from '@angular/core';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor() {}

  errorMsg() {
    alert('error');
  }
  confirmMsg() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }
  test(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }
  openBlob(data: any, nameF: any) {
    const file = new Blob([data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
    // var a = document.createElement('a');
    // a.href = fileURL;
    // a.target = '_blank';
    // a.download = nameF;
    // document.body.appendChild(a);
    // a.click();
  }

  openBlobExcel(data: any,status: string) {
    const file = new Blob([data], { type: data.type });
    const fileURL = URL.createObjectURL(file);
    // window.open(fileURL);
    var a = document.createElement('a');
    a.href = fileURL;
    a.target = '_blank';
    a.download = moment(new Date()).format('YYYYMMDD_HHmmss_')+ status;
    document.body.appendChild(a);
    a.click();
  }

  // const fileBlob = new Blob([resp], {
  //   type: 'application/pdf'
  // });
  // const fileURL = URL.createObjectURL(fileBlob);
  // this.loading = false;
  // window.open(fileURL);
}
