import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of as observableOf, merge } from 'rxjs'

@Component({
  selector: 'app-location-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users = new MatTableDataSource<any>();
  public errorMsg: any;

  // @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private router: Router,
    ) { }

  columns = ['name', 'email', 'description', 'action']
  index = ['_id', 'firstname', 'lastname', 'description', 'email', 'password']
  
  

  ngOnInit(): void {
    this.userService.GetUsers().subscribe(
      (data: any) => this.users.data = data,
      (error) => this.errorMsg = error
    );
  }
  
  /* ngAfterViewInit(): void {
    console.log('afterviewinit')
    this.userService.GetUsers().subscribe(
      (data: any) => this.users.data = data,
      (error) => this.errorMsg = error
    );
    // this.users.paginator = this.paginator;  
  } */

  /* refresh(usersEvent:any) {
    this.users.data = usersEvent;
  } */

  connect(): Observable<any>{
    return merge(observableOf(this.users))
  }

  adduser() {
    this.router.navigate(['/users/add']);
  }

  selectuser(user: any) {
    console.log(user)
    this.router.navigate(['/users/view/', user._id]);
  }

  edituser(user: any) {
    this.router.navigate(['/users/edit/', user._id]);
  }

  deleteuser(user: any) {
    if(window.confirm('Do you want to go ahead?')) {
      this.userService.deleteUser(user._id).subscribe(() => {
        this.userService.GetUsers().subscribe(
          (data:any) => this.users.data = data,
          (error) => this.errorMsg = error
        )
      });
    }
  }
}
