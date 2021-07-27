import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table'
import { DoctorService } from '../service/doctor.service';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  Doctors = new MatTableDataSource<any>();
  errorMsg: any;
  doctorForm: FormGroup;
  editForm: FormGroup;
  isDisplayed: boolean = true;
  editorDisplay = true;

  constructor(
    private doctorService: DoctorService,
    private router: Router,
    public formBuilder: FormBuilder
    ) { 
        this.doctorForm = this.formBuilder.group({
          firstname: [''],
          lastname: [''],
          filenumber: [''],
        })
        this.editForm = this.formBuilder.group({
          _id: [],
          firstname: [],
          lastname: [],
          filenumber: []
        })
      }
  columns = ['firstname', 'lastname', 'filenumber', 'action']
  index = ['_id', 'firstname', 'lastname', 'filenumber']

  ngOnInit(): void {
    this.doctorService.GetDoctors().subscribe((res:any) => {
      this.Doctors.data = res;
    })
  }

  display(){
    if (this.isDisplayed) {
      this.isDisplayed = false;
    }else{
      this.isDisplayed = true;
    }
  }

  addDoctor(): any {
    console.log('add Doctor')
  }
  
  onSubmit(): any {
    this.doctorService.AddDoctor(this.doctorForm.value)
    .subscribe(() => {
        console.log('Data added successfully!')
      }, (err) => {
        console.log(err);
    });
  }

  editDoctor(){
    this.doctorService.updateDoctor(this.editForm.getRawValue()['_id'], this.editForm.value).subscribe((res) => {
      if (res.result) {
        this.editForm.reset()
        this.router.navigate(['/doctor']);
      }
    })
  }

  edit(id:any) {
    this.editorDisplay = false;
    this.doctorService.GetDoctor(id).subscribe(res => {
      this.editForm.setValue({
        _id: res['_id'],
        firstname: res['firstname'],
        lastname: res['lastname'],
        filenumber: res['filenumber']
      });
    });
  }

  deletedoctor(doctor: any) {
    if(window.confirm('Do you want to go ahead?')) {
      this.doctorService.deleteDoctor(doctor._id).subscribe(() => {
        this.doctorService.GetDoctors().subscribe(
          (data:any) => this.Doctors.data = data,
          (error) => this.errorMsg = error
        )
      });
    }
  }
}
