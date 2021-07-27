import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { UserService } from '../service/user.service';

import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  /* @Output() usersEvent = new EventEmitter<any>();
  users: any; */

  userId: any;
  user: any;
  errorMsg: any;
  editForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private actRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
  ) {
    this.editForm = this.formBuilder.group({
      firstname: [],
      lastname: [],
      description: [],
      email: [],
      password: []
    })
   }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.userId = id;
    });

    this.user = this.userService.GetUser(this.userId).subscribe(
      (data) => {this.user = data; console.log(data);},
      (error) => {this.errorMsg = error; console.log(error); }
    );
  }

  editUser(userID: any, user: any){
    console.log(this.user);
    console.log(this.userId);
    this.userService.updateUser(this.userId, this.editForm.value).subscribe(
      (res) => {
        if (res.result) {
          this.editForm.reset();
        }
      },
      (error) => {
        this.errorMsg = error; 
        console.log(error);
      }
    );
    //
    /* this.userService.GetUsers().subscribe(
    (data) => this.users = data,
    (error) => this.errorMsg = error
    ); */
    /* this.usersEvent.emit(this.users);
    this.router.navigate(['/users']); */
    this.router.navigate(['users']);
  }
}
