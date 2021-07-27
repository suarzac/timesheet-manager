import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DoctorService } from '../service/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  Doctors: any = [];
  doctorForm: FormGroup;
  editForm: FormGroup;
  isDisplayed: boolean = true;
  editorDisplay = true;
  errorMsg: any;

  constructor(
    private doctorService: DoctorService,
    private router: Router,
    public formBuilder: FormBuilder
    ) { 
        this.doctorForm = this.formBuilder.group({
          firstname: ['', [Validators.required, Validators.minLength(3)]],
          lastname: ['', [Validators.required, Validators.minLength(3)]],
          filenumber: ['', [Validators.required, Validators.pattern('^[0-9]+')]],
        })
        this.editForm = this.formBuilder.group({
          _id: [],
          firstname: [],
          lastname: [],
          filenumber: []
        })
      }

  ngOnInit(): void {
    this.doctorService.GetDoctors().subscribe(res => {
      this.Doctors = res;
    })
  }

  display(){
    if (this.isDisplayed) {
      this.isDisplayed = false;
    }else{
      this.isDisplayed = true;
    }
  }

  onSubmit(): any {
    this.doctorService.AddDoctor(this.doctorForm.value)
    .subscribe(() => {
        console.log('Data added successfully!')
        this.doctorService.GetDoctors().subscribe(
          (data) => this.Doctors = data,
          (error) => this.errorMsg = error
        )
      }, (err) => {
        console.log(err);
    });
  }

  editUser(){
    this.doctorService.updateDoctor(this.editForm.getRawValue()['_id'], this.editForm.value).subscribe((res) => {
      if (res.result) {
        this.editForm.reset()
      }
      this.editorDisplay = !this.editorDisplay
      this.doctorService.GetDoctors().subscribe(
        (data) => this.Doctors = data,
        (error) => this.errorMsg = error
      )
    })
  }

  edit(id:any) {
    this.editorDisplay = !this.editorDisplay;
    this.doctorService.GetDoctor(id).subscribe(res => {
      this.editForm.setValue({
        _id: res['_id'],
        firstname: res['firstname'],
        lastname: res['lastname'],
        filenumber: res['filenumber']
      });
    });
  }

  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.doctorService.deleteDoctor(id).subscribe((res) => {
        this.Doctors.splice(i, 1);
      })
    }
  }

  get firstname() {
    return this.doctorForm.get('firstname');
  }

  get lastname() {
    return this.doctorForm.get('lastname');
  }

  get filenumber() {
    return this.doctorForm.get('filenumber');
  }
}
