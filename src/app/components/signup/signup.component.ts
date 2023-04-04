import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  error: string = '';
  success: string = '';
  username: string = '';
  password: string = '';
  email: string = '';
  public signupImage: string = '../../assets/signup.jpg';

  constructor(private userService: UserService) {}
  signUp() {
    if (this.username === '' || this.password === '' || this.email === '') {
      this.error = 'Can not leave fields empty';
      const timeout = setTimeout(() => {
        this.error = '';
      }, 1500);
      return;
    }
    if (
      this.email.includes('@gmail.com') ||
      this.email.includes('@outlook.com') ||
      this.email.includes('@hotmail.com')
    ) {
      console.log(this.username, this.email, this.password);

      this.userService
        .addUser(this.username, this.email, this.password)
        .subscribe(
          (result: any) => {
            console.log(result.data.addUser);
            this.username = '';
            this.email = '';
            this.password = '';
            this.success = 'Sign up successfully'
            const timeout = setTimeout(() => {
              this.error = '';
              this.success = ''
            }, 1500);
          },
          (errors) => {
            this.error = 'Username or email has been taken';
            console.log(errors);
            const timeout = setTimeout(() => {
              this.error = '';
            }, 1500);
            return;
          }
        );
    } else {
      this.error = 'Invalid email';
      const timeout = setTimeout(() => {
        this.error = '';
      }, 1500);
    }
  }
}
