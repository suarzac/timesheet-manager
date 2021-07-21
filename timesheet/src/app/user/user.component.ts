import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";

import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser: any = {};
  id = this.actRoute.snapshot.paramMap.get('id'); 
  Users:any = [];
  userForm: FormGroup;
  isDisplayed = true;

  constructor(
    private actRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    ) {
      let id = this.actRoute.snapshot.paramMap.get('id');
      this.authService.getUserProfile(id).subscribe(res => {
        this.currentUser = res.msg;
      })

      this.userForm = this.formBuilder.group({
        firstname: [''],
        lastname: [''],
        description: [''],
        email: [''],
        password: ['']
      })
    }

  ngOnInit(): void {
    this.userService.GetUsers().subscribe(res => {
      console.log(res)
      this.Users = res;
    });   
  }

  displayForm(){
    if (this.isDisplayed) {
      this.isDisplayed = false;
    }else{
      this.isDisplayed = true;
    }
  }

  registerUser() {
    this.authService.signUp(this.userForm.value).subscribe((res) => {
      if (res.result) {
        this.userForm.reset()
        this.router.navigate(['/user-profile/'+this.id]);
      }
    })
  }

  edit(id:any) {
    this.userService.updateUser(id, this.userForm.value).subscribe((res) => {
      if (res.result) {
        this.userForm.reset()
        this.router.navigate(['/user-profile/'+this.id]);
      }
    })
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
