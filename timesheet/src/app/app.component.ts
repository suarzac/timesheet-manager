import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'timesheet';
  
  constructor( 
    public authService: AuthService,
    public route: ActivatedRoute
  ) {}

  logout() {
    this.authService.doLogout()
  }

}
