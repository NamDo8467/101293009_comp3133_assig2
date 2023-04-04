import { Component, Output, EventEmitter } from '@angular/core';
import { gql } from 'apollo-angular';
import { Employee } from 'src/app/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent {
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public gender: string = 'Male';
  public salary: number = 0;
  public success: string;
  public error: string;
  public employee: any;
  @Output() addingEmployee: EventEmitter<Employee> = new EventEmitter();
  constructor(private employeeService: EmployeeService) {
    if (localStorage.getItem('login') !== 'true') {
      window.location.replace('/');
    }
  }

  addEmployee() {
    if (isNaN(this.salary)) {
      this.error = 'Salary must be a number';
      this.success = '';
      const timeout = setTimeout(() => {
        this.error = '';
      }, 2500);
      return;
    }
    if (
      this.email.includes('@gmail.com') ||
      this.email.includes('@outlook.com') ||
      this.email.includes('@hotmail.com')
    ) {
      this.employeeService
        .addNewEmployee(
          this.firstName,
          this.lastName,
          this.gender,
          this.email,
          this.salary
        )
        .subscribe(
          (result: any) => {
            this.employee = result.data.addNewEmployee;
            this.firstName = '';
            this.lastName = '';
            this.gender = 'Male';
            this.email = '';
            this.salary = 0;
            this.success = 'Successfully added';
            this.error = '';
            this.addingEmployee.emit(this.employee);
            const timeout = setTimeout(() => {
              this.success = '';
            }, 2500);
          },
          (error: any) => {
            if (error.message.includes('duplicate')) {
              this.error =
                'The email has been used. Please try a different one';
              this.success = '';
              const timeout = setTimeout(() => {
                this.error = '';
              }, 2500);
            } else {
              this.error = error.message.replace(
                'Employee validation failed: ',
                ''
              );

              if (this.error.indexOf('first_name') > -1) {
                this.error = 'Please enter the first name';
                this.success = '';
              } else if (this.error.indexOf('last_name') > -1) {
                this.error = 'Please enter the last name';
                this.success = '';
              }
              const timeout = setTimeout(() => {
                this.error = '';
              }, 2500);
            }
          }
        );
    } else {
      this.error = 'Please enter a valid email';
      this.success = '';
      const timeout = setTimeout(() => {
        this.error = '';
      }, 2500);
    }
  }
}
