import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
// import { User } from 'src/app/User';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginImage: string = '../../assets/login.jpg';
  public error: string = '';
  public username: string = '';
  public password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.logUserIn(this.username, this.password).subscribe(
      (result: any) => {
        if (result.data.login === null) {
          this.error = 'Username or password is wrong';
          setTimeout(() => {
            this.error = '';
          }, 2000);
        } else {
          localStorage.setItem('login', 'true');
          window.location.replace('/employees');
        }
        // console.log(result.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
