import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/Employee';
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent {
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public gender: string = 'Male';
  public salary: number = 0;
  public success: string;
  public error: string;
  public employee: Employee;
  public employeeID: string;
  public loading: boolean = true;
  constructor(
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((params) => {
      this.employeeID = params['id'];
    });

    employeeService.getEmployeeByID(this.employeeID).subscribe(
      (result: any) => {
        this.employee = result.data.getEmployeeById;
        // console.log(this.employee);
        this.firstName = this.employee.first_name;
        this.lastName = this.employee.last_name;
        this.email = this.employee.email;
        this.gender = this.employee.gender;
        this.salary = this.employee.salary;
        this.loading = false;
      },
      (error) => {
        this.error = 'ID not found';
        this.loading = false;
      }
    );
  }

  editEmployee() {
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
      const newEmployee: Employee = {
        id: this.employee.id,
        first_name: this.firstName,
        last_name: this.lastName,
        gender: this.gender,
        salary: this.salary,
        email: this.email,
      };
      this.employeeService.editEmployee(newEmployee).subscribe(
        (result: any) => {
          this.employee = result.data.addNewEmployee;
          this.error = '';
          this.success = "Updated successfully"
          const timeout = setTimeout(() => {
            this.success = '';
          }, 2500);
        },
        (error: any) => {
          if (error.message.includes('duplicate')) {
            this.error = 'The email has been used. Please try a different one';
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
