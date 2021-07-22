import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from '../service/location.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {

  public locations: any;
  public errorMsg: any;

  constructor(private locService: LocationService,
  private router: Router) { }

  ngOnInit(): void {
    this.locService.getLocations().subscribe(
      (data) => this.locations = data,
      (error) => this.errorMsg = error
    )
  }

  selectlocation(location: any) {
    console.log(location)
    this.router.navigate(['/locations/', location._id]);
  }

  editlocation(location: any) {
    this.router.navigate(['/locations/edit/', location._id]);
  }

  deletelocation(location: any) {
    this.locService.deleteLocation(location._id).subscribe(() => {
      this.locService.getLocations().subscribe(
        (data) => this.locations = data,
        (error) => this.errorMsg = error
      )
    })
  }
}
