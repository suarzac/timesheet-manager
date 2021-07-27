import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";

import { AuthService } from '../service/auth.service';

import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  registerForm: FormGroup

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private userService: UserService,
    private router: Router
    ) { 
      this.registerForm = this.fb.group({
        firstname: [''],
        lastname: [''],
        description: [''],
        email: [''],
        password: ['']
      })
    }
  
  ngOnInit(): void {}

  registerUser() {
    this.authService.signUp(this.registerForm.value).subscribe((res) => {
      if (res.result) {
        this.registerForm.reset();
        this.router.navigate(['users']);
      }
    })
  }
}