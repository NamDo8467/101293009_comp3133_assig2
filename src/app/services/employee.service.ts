import { Injectable, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Employee } from '../Employee';
import { Observable, of } from 'rxjs';
import { ALL_EMPLOYEES_QUERY } from '../graphql/graphql.queries';
import { gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}
  // employees: ApolloQueryResult<Employee[]>;
  getAllEmployees(): Observable<any> {
    return this.apollo.watchQuery({ query: ALL_EMPLOYEES_QUERY }).valueChanges;
  }
  getEmployeeByID(id: string) {
    return this.apollo.watchQuery({
      query: gql`
        query {
          getEmployeeById(id: "${id}") {
            id
            first_name
            last_name
            gender
            email
            salary
          }
        }
      `,
    }).valueChanges;
  }
  addNewEmployee(
    firstName: string,
    lastName: string,
    gender: string,
    email: string,
    salary: number
  ) {
    return this.apollo.mutate({
      mutation: gql`
        mutation{
          addNewEmployee(first_name:"${firstName}",last_name:"${lastName}", email:"${email}", gender:"${gender}", salary:${salary}){
            first_name, last_name,email, gender, salary,id
          }
        }
        `,
    });
  }
  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation{
          deleteEmployeeById(id:"${id}"){
            first_name, last_name,email, gender, salary,id
          }
        }
      `,
    });
  }

  editEmployee(employee: Employee) {
    return this.apollo.mutate({
      mutation: gql`
        mutation{
          updateEmployeeById(id:"${employee.id}", first_name:"${employee.first_name}", last_name:"${employee.last_name}", gender:"${employee.gender}", salary:${employee.salary}, email:"${employee.email}"){
            id,  first_name, last_name,email, gender, salary
          }
        }
      `,
    });
  }
}
