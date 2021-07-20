import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../service/User';
import { FormGroup, FormBuilder } from "@angular/forms";

import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  Users:any = [];
  userForm: FormGroup;
  isDisplayed = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone,
    public formBuilder: FormBuilder
    ) {
      this.userForm = this.formBuilder.group({
        firstname: [''],
        lastname: [''],
        description: [''],
        email: [''],
        password: ['']
      }
      )
    }

  ngOnInit(): void {
    this.userService.GetUsers().subscribe(res => {
      console.log(res)
      this.Users = res;
    });   
  }

  displayForm(){
    console.log('hello')
    if (this.isDisplayed) {
      this.isDisplayed = false;
    }else{
      this.isDisplayed = true;
    }
  }
  onSubmit(): any {
    this.userService.AddUser(this.userForm.value)
    .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/user'))
      }, (err) => {
      console.log(err);
    });
  }

  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.userService.deleteUser(id).subscribe((res) => {
        this.Users.splice(i, 1);
      })
    }
  }

}
