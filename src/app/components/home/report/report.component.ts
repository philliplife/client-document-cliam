import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';
import * as moment from 'moment';
import { ShareService } from 'src/app/services';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  date3?: Date;
  formReport: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private shareService: ShareService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formReport = this.fb.group({
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      submit: new FormControl(null, [Validators.required]),
    });
    this.formReport.reset();
    this.formReport.patchValue({
      startDate: new Date(),
      endDate: new Date(),
    });
  }

  onSubmit() {
    const yearStart = moment(this.formReport.value.startDate).format('YYYY');
    const startY = Number(yearStart) + 543;
    const yearEnd = moment(this.formReport.value.endDate).format('YYYY');
    const endY = Number(yearEnd) + 543;
    const data = {
      docushare_submit_date_1:
        String(startY) + moment(this.formReport.value.startDate).format('MMDD'),
      docushare_submit_date_2:
        String(endY) + moment(this.formReport.value.endDate).format('MMDD'),
      docushare_status: this.formReport.value.submit,
      // docushare_submit_date_1: moment(this.formReport.value.startDate).format('YYYYMMDD'),
      // docushare_submit_date_2: moment(this.formReport.value.endDate).format('YYYYMMDD'),
      // docushare_status: this.formReport.value.submit,
    };
    this.reportService.report(data).subscribe({
      next: (res) => {
        
        this.shareService.openBlobExcel(res,data.docushare_status);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'ระบบผิดพลาด',
          text: 'Data not found',
          confirmButtonText: 'ตกลง',
        });
      },
    });
  }
}
