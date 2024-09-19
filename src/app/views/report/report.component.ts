import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import moment from 'moment';
import IReport from '../../shared/interfaces/report';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  
  public displayedColumns: string[] = ['request_date', 'type', 'processing_day', 'processing_date'];
  public dataSource: IReport[] = [];
  public formData: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formData = this.formBuilder.group({
      type: ['', [Validators.required]],
      day: ['', [Validators.required,Validators.min(1), Validators.max(31)]]
    });
  }

  public addReport() {

    if (!this.formData.valid) return;
    const type = this.formData.value.type;
    const day = this.formData.value.day;
    const result = this.calculateDates(type, day);
    const invalidDate = this.validateNonRepeat(result);
    if(invalidDate) {
      alert('Repeated report, select another day');
    } else {
      this.dataSource = [...this.dataSource, result];
      this.resetForm();
    }
  }

  private calculateDates(type: number, day: number): IReport {
    let request: string, processing: string;
    if(type === 1 ) {
      request = moment().format('YYYY-MM-DD');
      processing = moment(request).add(1, 'months').date(day).format('YYYY-MM-DD');
    } else {
      request = moment().format('YYYY-MM-DD');
      const quarter = moment(request).quarter();
      processing = moment().quarter(quarter + 1).startOf('quarter').date(day).format('YYYY-MM-DD');
    }

    return {
      request_date: request,
      type: type === 1 ? 'MONTHLY' : 'QUARTERLY',
      processing_day: day,
      processing_date: processing
    }
  }

  private resetForm() {
    this.formData.reset();
    for(let name in this.formData.controls) {
      this.formData.controls[name].setErrors(null);
    }
  }

  private validateNonRepeat(report: IReport) {
    return this.dataSource.some(x => x.processing_date === report.processing_date && x.type === report.type);
  }
  
  private validateMonths() {

  }
}
