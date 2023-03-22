import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { resClaimSearch } from '../models/index';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpEvent } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { WebApiService } from './webapi.service';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  baseUrl = 'http://localhost:8080';

  constructor(
    private _http: HttpClient,
    public webapi: WebApiService
  ) { }

  //claimLst() {
  //return this._http.get<resClaimSearch>('../../assets/data/claimSerch.json');
  // .map((resp) => resp.json());
  // .catch(this.handleError);
  // .filter( data => data.group === usrGroup)
  //}

  // claimLst(srchdata:any): Observable<string> {
  //   let url: string = environment.apiclaim;
  //   let action: string = 'search';
  //   let data = srchdata
  //   return this.webapi.claimapiPost<string>(url, action, data);
  // }
  claimLst(srchdata: any): Observable<any> {
    const action = 'search';
    const data = srchdata;
    return this.webapi.claimapiPost<any>(action, data)
  }

  edtClaim(claimId: any) {
    const action = 'edit';
    const data = { "claim_no": claimId };
    return this.webapi.claimapiPost<any>(action, data)
  }
  verifyDoc(fd:any): Observable<HttpEvent<any>> {
    const action = 'verify';
    const data = fd
    return this.webapi.apiPostFile<any>(action, data)

  }
  uploadDoc(data_:any): Observable<HttpEvent<any>> {
    const action = 'upload';
    const data = data_
    return this.webapi.claimapiPost<any>(action, data)

  }
  cancelverify(data_:any): Observable<HttpEvent<any>> {
    const action = 'cancelverify';
    const data = data_
    return this.webapi.claimapiPost<any>(action, data)

  }
  deleteDoc(data_:any): Observable<HttpEvent<any>> {
    const action = 'delete';
    const data = data_
    return this.webapi.claimapiPost<any>(action, data)
  }
  subDoc(data_:any): Observable<HttpEvent<any>> {
    const action = 'submit';
    const data = data_
    return this.webapi.claimapiPost<any>(action, data)
  }
  viewDoc(data_:any): Observable<HttpEvent<any>> {
    const action = 'view';
    const data = { "claim_no": data_ };
    return this.webapi.claimapiPost<any>(action, data)
  }

  /////
  openDoc(data_:any):Observable<Blob>  {
    const action = 'document';
    const data = data_
    return this.webapi.apiGetBlob<any>(action, data)
  }
  openFaxDoc(data_:any):Observable<Blob>  {
    const action = 'FaxClaimPdf';
    const data = data_
    return this.webapi.apiReportGetBlob<any>(action, data)
  }
  openApproveDoc(data_:any):Observable<Blob>  {
    const action = 'ClaimApprovePdf';
    const data = data_
    return this.webapi.apiReportGetBlob<any>(action, data)
  }

  openDocShare(data_:any):Observable<Blob>  {
    const action = 'docushare';
    const data = data_
    return this.webapi.apiGetBlob<any>(action, data)
  }

  unSubmit(data_:any):Observable<Blob>  {
    const action = 'unsubmit';
    const data = data_
    return this.webapi.claimapiPost<any>(action, data)
  }


  // public downloadExcel(data): void {
  //   const url: string = '[api endpoint here ]';
  //   this.http.post(url, data.body, { responseType: 'blob' })
  //     .subscribe((response: Blob) => saveAs(response, data.fileName + '.xlsx'));
  // }
  /////////
  // openDocShare(data_:any): Observable<HttpEvent<any>> {
  //   const action = 'docushare';
  //   const data = data_
  //   return this.webapi.apiGetBlob(action, { observe: 'response', responseType: 'blob' }).pipe(
  //     map((response: HttpResponse<Blob>) => {
  //       return new Blob([response.body], { type: 'application/pdf', });;
  //     }));
  // }
  // getFiles(): Observable<any> {
  //   return this._http.get(`${this.baseUrl}/files`);
  // }
}

