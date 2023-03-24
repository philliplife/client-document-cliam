import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WebApiService } from './webapi.service';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private _http: HttpClient, public webapi: WebApiService) {}

  report(data: any): Observable<any> {
    const url = environment.apiReport + 'report/search';
    const opt: any = { responseType: 'blob' };
    return this._http.post<any>(url, data, opt);
  }

  downloadExcel(data: any): void {
    const url: string = '[api endpoint here ]';
    // this.http
    //   .post(url, data.body, { responseType: 'blob' })
    //   .subscribe((response: Blob) => saveAs(response, data.fileName + '.xlsx'));
  }
}
