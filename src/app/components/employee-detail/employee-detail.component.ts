import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent {
  employeeID: string;
  employee: Employee;
  error: string;
  loading: boolean = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService
  ) {
    if (localStorage.getItem('login') !== 'true') {
      window.location.replace('/');
    } else {
      activatedRoute.params.subscribe((params) => {
        this.employeeID = params['id'];
      });

      employeeService.getEmployeeByID(this.employeeID).subscribe(
        (result: any) => {
          this.employee = result.data.getEmployeeById;
          // console.log(this.employee);
          this.loading = false;
        },
        (error) => {
          this.error = 'ID not found';
          this.loading = false;
        }
      );
    }
  }
}
