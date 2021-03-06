import { Component, OnInit } from '@angular/core';
import { TimecardService } from '../service/timecard.service';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../service/location.service';
import { DoctorService } from '../service/doctor.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-timecard',
  templateUrl: './timecard.component.html',
  styleUrls: ['./timecard.component.css']
})
export class TimecardComponent implements OnInit {
  Timecards: any = [];
  Locations: any = [];
  Doctors: any = [];

  isDisplayed: boolean = true;
  editorDisplay: boolean = true;
  timecardForm: FormGroup;
  editForm: FormGroup;
  id: any;
  errorMsg: any;
  
  constructor(
    private timecardService: TimecardService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private locService: LocationService,
    private docService: DoctorService

  ) {
    this.timecardForm = this.formBuilder.group({
      doctor_id: [''],
      date: ['', [Validators.required]],
      sector: ['', [Validators.required]],
      location: ['', [Validators.required]],
      time_in: ['', [Validators.required]],
      time_out: ['', [Validators.required]],
      pay_code: ['', [Validators.required]]
    }, {
      //validators: [this.createTimeRangeValidator]
    })
    this.editForm = this.formBuilder.group({
      _id: [],
      doctor_id: [],
      date: [],
      sector: [],
      location: [],
      time_in: [],
      time_out: [],
      pay_code: []
    })
  }
  /*
  createTimeRangeValidator(fGroup: FormGroup): ValidatorFn {
    const start: Time = fGroup.get("time_in")
    const end: Time = fGroup.get("time_out")

    if (start && end) {
      const isRangeValid = (end - start > 0);

      return isRangeValid ? null : {timeRange:true};
    }
    return null;
  }
  */

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.timecardService.GetTimecardAll(this.id).subscribe(res => {
      this.Timecards = res;
    });
    this.locService.GetLocations().subscribe(res => {
      this.Locations = res});
    this.docService.GetDoctors().subscribe(res => {
        this.Doctors = res});
  }

  display(id: any){
    if (this.isDisplayed) {
      this.isDisplayed = false;
    }else{
      this.isDisplayed = true;
    }
    this.timecardForm.setValue({
      doctor_id: id,
      date: [''],
      sector: [''],
      location: [''],
      time_in: [''],
      time_out: [''],
      pay_code: ['']
    });
  }

  onSubmit(): any {
    this.timecardService.AddTimecard(this.timecardForm.value).subscribe(
      (data) => {
        this.Timecards = data;
        console.log(this.Timecards)
        this.timecardService.GetTimecards().subscribe(
          (data) => this.Timecards = data,
          (error) => this.errorMsg = error
        )
      }, (err) => {
        console.log(err);
    });
  }
  editTimecard(){
    this.timecardService.updateTimecard(this.editForm.getRawValue()['_id'], this.editForm.value).subscribe((res) => {
      if (res.result) {
        this.editForm.reset()
      }
      this.editorDisplay = !this.editorDisplay
      this.timecardService.GetTimecards().subscribe(
        (data) => this.Timecards = data,
        (error) => this.errorMsg = error
      )
    })
  }
  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.timecardService.deleteTimecard(id).subscribe((res) => {
        this.Timecards.splice(i, 1);
      })
    }
  }
  edit(id:any) {
    this.editorDisplay = !this.editorDisplay;
    this.timecardService.GetTimecard(id).subscribe(res => {
      this.editForm.setValue({
      _id: res['_id'],
      doctor_id: res['doctor_id'],
      date: res['date'],
      sector: res['sector'],
      location: res['location'],
      time_in: res['time_in'],
      time_out: res['time_out'],
      pay_code: res['pay_code']
      });
    });
  }

  get date() {
    return this.timecardForm.get('date');
  }

  get sector() {
    return this.timecardForm.get('sector');
  }

  get location() {
    return this.timecardForm.get('location');
  }

  get time_in() {
    return this.timecardForm.get('time_in');
  }

  get time_out() {
    return this.timecardForm.get('time_out');
  }

  get pay_code() {
    return this.timecardForm.get('pay_code');
  }
}
