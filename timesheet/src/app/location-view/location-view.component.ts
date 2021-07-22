import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LocationService } from '../service/location.service';

@Component({
  selector: 'app-location-view',
  templateUrl: './location-view.component.html',
  styleUrls: ['./location-view.component.css']
})
export class LocationViewComponent implements OnInit {

  public locationId: any;
  public location: any;
  public errorMsg: any;

  constructor(private route: ActivatedRoute, private locService: LocationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      console.log(id)
      this.locationId = id;
      console.log(this.locationId);
    });
    this.locService.getLocationsById(this.locationId).subscribe(
      (data) => {
        this.location = data;
        console.log(data);
      },
      (error) => {this.errorMsg = error; console.log(error); }
    );
  }

}
