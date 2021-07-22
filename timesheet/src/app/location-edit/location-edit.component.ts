import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LocationService } from '../service/location.service';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent implements OnInit {

  locationId: any;
  location: any;
  errorMsg: any;
  locations: any;

  constructor(private locService: LocationService, private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      console.log(id)
      this.locationId = id;
      console.log(this.locationId);
    });
    this.location = this.locService.getLocationsById(this.locationId).subscribe(
      (data) => {this.location = data; console.log(data);},
      (error) => {this.errorMsg = error; console.log(error); }
    );
  }

  update(locationId: any, location: any){
    console.log(this.location);
    console.log(this.locationId);
    this.locService.updateLocation(this.locationId, this.location).subscribe(
      (data) => {this.location = data; console.log(data);
        this.locService.getLocations().subscribe(
          (data) => this.locations = data,
          (error) => this.errorMsg = error
    )
  },
  (error) => {this.errorMsg = error; console.log(error); } 
  );
  this.router.navigate(['/locations']);
  }
}
