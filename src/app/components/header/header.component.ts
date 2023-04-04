import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  // title: string = 'Employee List';
  public urlPath: string = '';
  // public router: Router = Router

  constructor(private location: Location, private router: Router) {
    this.urlPath = this.location.path();
  }
  ngOnInit(): void {}

  toggleAddTask() {
    console.log('toggle');
  }

  goBack() {
    window.location.replace('/employees');
  }
  goToAddEmployee() {
    window.location.replace('/addEmployee');
  }

  logout() {
    localStorage.removeItem('login');
    window.location.replace('/');
  }
}
