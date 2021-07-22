import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../service/doctor.service';
import { TimecardService } from '../service/timecard.service';

@Component({
  selector: 'app-timesheet-list',
  templateUrl: './timesheet-list.component.html',
  styleUrls: ['./timesheet-list.component.css']
})
export class TimesheetListComponent implements OnInit {

  Timecards: any = [];
  Doctors: any = [];

  isDisplayed: boolean = true;
  editorDisplay: boolean = true;
  timecardForm: FormGroup;

  constructor(private timecardService: TimecardService,
    private docService: DoctorService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder) {
      this.timecardForm = this.formBuilder.group({
        doctor_id: [],
        date: [''],
        sector: [''],
        location: [''],
        time_in: [''],
        time_out: ['']
      })
    }

  ngOnInit(): void {
    this.timecardService.GetTimecards().subscribe(res => {
      this.Timecards = res;
    })
    this.docService.GetDoctors().subscribe(res => {
      this.Doctors = res;
    })
  }

}
