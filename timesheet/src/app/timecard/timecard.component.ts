import { Component, OnInit } from '@angular/core';
import { TimecardService } from '../service/timecard.service';

@Component({
  selector: 'app-timecard',
  templateUrl: './timecard.component.html',
  styleUrls: ['./timecard.component.css']
})
export class TimecardComponent implements OnInit {
  Timecards: any = [];

  constructor(
    private timecardService: TimecardService,

  ) { }

  ngOnInit(): void {
    this.timecardService.GetTimecards().subscribe(res => {
      console.log(res)
      this.Timecards = res;
    })
  }

}
