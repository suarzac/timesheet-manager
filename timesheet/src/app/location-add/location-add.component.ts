import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from '../service/location.service';
import { Location } from '../service/location';

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {

  locations: any;
  errorMsg: any;
  
  sectors = ['East', 'West'];

  constructor(private locService: LocationService, private router: Router) { }

  public locModel = new Location();
  
   ngOnInit(): void {
  }
  
  

  onSubmit(locForm: any){
    console.log(this.locModel);
    this.locService.postLocation(this.locModel).subscribe(
      (data) => {this.locations = data;
        this.locService.getLocations().subscribe(
          (data) => this.locations = data,
          (error) => this.errorMsg = error
        )
        },
      (error) => this.errorMsg = error
    )
    this.router.navigate(['/locations'])
  }
}
