import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeItemComponent } from './components/employee-item/employee-item.component';
import { GraphQLModule } from './graphql.module';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { FormsModule } from '@angular/forms';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const appRoute: Routes = [
  { path: '', component: LoginComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'addEmployee', component: AddEmployeeComponent },
  { path: 'employee/:id', component: EmployeeDetailComponent },
  { path: 'editEmployee/:id', component: EditEmployeeComponent },
  { path: 'signup', component: SignupComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    EmployeesComponent,
    EmployeeItemComponent,
    AddEmployeeComponent,
    EmployeeDetailComponent,
    EditEmployeeComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    GraphQLModule,
    FormsModule,
    RouterModule.forRoot(appRoute),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
