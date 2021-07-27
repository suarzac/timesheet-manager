import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from "@angular/forms";

import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

// FontAwesome icons
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  faUser = faUser;
  currentUser: any = {};

  id = this.actRoute.snapshot.paramMap.get('id'); 
  Users:any = [];

  userForm: FormGroup;
  editForm: FormGroup;
  isDisplayed = true;
  editorDisplay = true;

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

      this.editForm = this.formBuilder.group({
        _id: [],
        firstname: [],
        lastname: [],
        description: [],
        email: [],
        password: []
      })
    }

  ngOnInit(): void {
    this.userService.GetUsers().subscribe(res => {
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
  editUser(){
    this.userService.updateUser(this.editForm.getRawValue()['_id'], this.editForm.value).subscribe((res) => {
      if (res.result) {
        this.editForm.reset()
        this.router.navigate(['/user-profile/'+this.id]);
      }
    })
  }
  edit(id:any) {
    this.editorDisplay = false;
    this.userService.GetUser(id).subscribe(res => {
      this.editForm.setValue({
      _id: res['_id'],
      firstname: res['firstname'],
      lastname: res['lastname'],
      description: res['description'],
      email: res['email'],
      password: res['password']
      });
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
