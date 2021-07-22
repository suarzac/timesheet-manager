import { Component, OnInit } from '@angular/core';
import { TimecardService } from '../service/timecard.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../service/location.service';
import { DoctorService } from '../service/doctor.service';

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
  id: any;
  constructor(
    private timecardService: TimecardService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private locService: LocationService,
    private docService: DoctorService

  ) {
    this.timecardForm = this.formBuilder.group({
      doctor_id: [''],
      date: [''],
      sector: [''],
      location: [''],
      time_in: [''],
      time_out: [''],
      pay_code: ['']
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.timecardService.GetTimecardAll(this.id).subscribe(res => {
      this.Timecards = res;
    });
    this.locService.getLocations().subscribe(res => {
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
    this.timecardService.AddTimecard(this.timecardForm.value)
    .subscribe(() => {
        console.log('Data added successfully!')
      }, (err) => {
        console.log(err);
    });
  }

  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.timecardService.deleteTimecard(id).subscribe((res) => {
        this.Timecards.splice(i, 1);
      })
    }
  }
}