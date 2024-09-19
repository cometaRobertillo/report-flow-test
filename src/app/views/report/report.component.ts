import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

const ELEMENT_DATA: any[] = [
  {request_date: '2024-19-09', type: 'MONTHLY', processing_day: 15, processing_date: '2024-10-15'},
  {request_date: '2024-19-09', type: 'QUARTERLY', processing_day: 15, processing_date: '2024-10-15'},
];

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
  public dataSource = ELEMENT_DATA;
  public filters: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.filters = this.formBuilder.group({
      type: ['', [Validators.required]],
      day: ['', [Validators.required,Validators.min(1), Validators.max(31)]]
    })
  }

  addReport() {
    if (this.filters.valid) {
      console.log(this.filters.value);
    } else {
      console.log('invalid');
    }
  }
}
