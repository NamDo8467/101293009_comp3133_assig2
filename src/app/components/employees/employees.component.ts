import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {
    // this.ngOnInit()
  }
  ngOnInit(): void {
    if (localStorage.getItem('login') !== 'true') {
      window.location.replace('/');
    } else {
      this.employeeService.getAllEmployees().subscribe((result) => {
        this.employees = result.data.getAllEmployees;
      });
    }
  }
  updateUIByDeleting(id) {
    this.employeeService.deleteEmployee(id).subscribe(
      (result: any) => {
        this.employees = this.employees.filter((employee) => {
          return employee.id !== result.data.deleteEmployeeById.id;
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
