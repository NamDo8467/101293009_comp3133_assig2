import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public urlPath: string;
  constructor(private location: Location) {
    this.urlPath = this.location.path();
    console.log(this.urlPath);
  }
}
