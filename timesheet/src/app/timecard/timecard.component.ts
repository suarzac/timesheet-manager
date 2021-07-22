import { Component, OnInit } from '@angular/core';
import { TimecardService } from '../service/timecard.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-timecard',
  templateUrl: './timecard.component.html',
  styleUrls: ['./timecard.component.css']
})
export class TimecardComponent implements OnInit {
  Timecards: any = [];

  isDisplayed: boolean = true;
  editorDisplay: boolean = true;
  timecardForm: FormGroup;
  id: any;
  constructor(
    private timecardService: TimecardService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,

  ) {
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
    this.id = this.route.snapshot.paramMap.get('id');
    this.timecardService.GetTimecardAll(this.id).subscribe(res => {
      this.Timecards = res;
    })
    
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
      time_out: ['']
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
