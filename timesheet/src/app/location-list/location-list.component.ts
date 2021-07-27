import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from '../service/location.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {

  public locations = new MatTableDataSource<any>();
  public errorMsg: any;

  constructor(private locService: LocationService,
  private router: Router) { }

  columns = ['title', 'sector', 'action']
  index = ['_id', 'title', 'sector']

  ngOnInit(): void {
    this.locService.getLocations().subscribe(
      (data) => this.locations.data = data,
      (error) => this.errorMsg = error
    )
  }

  addlocation() {
    this.router.navigate(['/locations/add']);
  }

  selectlocation(location: any) {
    console.log(location)
    this.router.navigate(['/locations/view/', location._id]);
  }

  editlocation(location: any) {
    this.router.navigate(['/locations/edit/', location._id]);
  }

  deletelocation(location: any) {
    this.locService.deleteLocation(location._id).subscribe(() => {
      this.locService.getLocations().subscribe(
        (data) => this.locations.data = data,
        (error) => this.errorMsg = error
      )
    })
  }
}
