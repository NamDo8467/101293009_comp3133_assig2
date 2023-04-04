import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from 'src/app/Employee';
import {
  faTimes,
  faFilePen,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-employee-item',
  templateUrl: './employee-item.component.html',
  styleUrls: ['./employee-item.component.css'],
})
export class EmployeeItemComponent {
  @Input() employee: Employee;
  @Output() deletingEmployee: EventEmitter<string> = new EventEmitter();
  faTimes = faTimes;
  faFilePen = faFilePen;
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;

  constructor(private employeeService: EmployeeService) {}
  deleteEmployee(id: string) {
    // this.employeeService.deleteEmployee(id).subscribe(
    //   (result: any) => {
    //     console.log(result);
    //     this.deletingEmployee.emit('deleting');
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );
    this.deletingEmployee.emit(id);
  }
}
