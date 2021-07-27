import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors, Validators } from "@angular/forms";

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
  editForm: FormGroup;
  isDisplayed = true;
  editorDisplay = true;
  errorMsg: any;

  constructor(
    private actRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    ) {
      let id = this.actRoute.snapshot.paramMap.get('id');
      console.log(id)
      this.authService.getUserProfile(id).subscribe(res => {
        this.currentUser = res.msg;
      })

      this.userForm = this.formBuilder.group({
        firstname: ['', [Validators.required, Validators.minLength(3)]],
        lastname: ['', [Validators.required, Validators.minLength(2)]],
        description: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5), this.createPasswordStrengthValidator()]]
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

  createPasswordStrengthValidator(): ValidatorFn {
      return (control:AbstractControl) : ValidationErrors | null => {
  
          const value = control.value;
  
          if (!value) {
              return null;
          }
  
          const hasUpperCase = /[A-Z]+/.test(value);
  
          const hasLowerCase = /[a-z]+/.test(value);
  
          const hasNumeric = /[0-9]+/.test(value);
  
          const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
  
          return !passwordValid ? {passwordStrength:true}: null;
      }
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
        this.editorDisplay = false
        this.userService.GetUsers().subscribe(
          (data) => this.Users = data,
          (error) => this.errorMsg = error
        )
      }
    })
  }
  editUser(){
    this.userService.updateUser(this.editForm.getRawValue()['_id'], this.editForm.value).subscribe((res) => {
      if (res.result) {
        this.editForm.reset()
      }
      this.editorDisplay = !this.editorDisplay
      this.userService.GetUsers().subscribe(
        (data) => this.Users = data,
        (error) => this.errorMsg = error
      )
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

  get firstname() {
    return this.userForm.get('firstname');
  }

  get lastname() {
    return this.userForm.get('lastname');
  }

  get description() {
    return this.userForm.get('description');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }
}
