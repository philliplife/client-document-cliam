import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(
    private http: HttpClient
  ) { }

  //use with webapi-interceptor.ts for setup http headers
  post<T>(url: string, action: string, data?: any, option?: object): Observable<T> {
    let _url = url + action;
    // let _body = JSON.stringify(data);
    let _body = data;
    return this.http.post<T>(_url, _body, option);

  }

  get<T>(url: string, action: string, option?: object): Observable<T> {
    let _url = url + action;
    return this.http.get<T>(_url, option);
  }

  claimapiPost<T>(action: string, data: any): Observable<any> {
    const _url = environment.apiclaim + action;
    // const _body = JSON.stringify(data);
    const _body = data;

    // let x: ResponseType;
    return this.http.post(_url, _body)
   // .pipe(
      //catchError(this.handleError));
  }
  apiGetBlob<T>(action: string, data: any) {
    const _url = environment.apiclaim + action;
    const _body = data;
    const _option = { responseType: 'blob' as 'json' }
    return this.http.post<Blob>(_url, data,_option );
  }
  apiReportGetBlob<T>(action: string, data: any) {
    const _url = environment.apiclaimreport + action;
    const _body = data;
    const _option = { responseType: 'blob' as 'json' }
    return this.http.post<Blob>(_url, data,_option );
  }

  apiPostFile<T>(action: string, fd: any): Observable<any> {
    const _url = environment.apiclaim + action;
    const _body = fd;
    const _httpOptions = {
      headers: new HttpHeaders({ "Content-Type": 'undefined' }),
    }
    return this.http.post<T>(_url, _body, _httpOptions);
  }

  private handleError(error: any) {
    return observableThrowError(error);
  }

}
