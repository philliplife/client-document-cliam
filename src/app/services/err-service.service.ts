import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrServiceService {

  constructor() { }
  _errMsg(inptitle: any, inptext: any, inpsts: any) {
    if (inpsts == "401" || inpsts == "440") {
      Swal.fire({
        title: "ระบบเกิดข้อผิดพลาด",
        text: "กรุณา Login ใหม่",
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }else{
      Swal.fire({
        title: inptitle,
        text: inptext,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }

  }
}

// errorSVC(inptitle: any, inptext: any, inpsts: any) {
//   if (inpsts == "401" || inpsts == "440") {
//     swal({
//       type: "error",
//       title: "ระบบเกิดข้อผิดพลาด",
//       text: "กรุณา Login ใหม่"
//     });
//     this.router.navigate(["/login"]);
//   } else {
//     swal({
//       type: "error",
//       title: inptitle,
//       text: inptext
//     });
//   }
// }
