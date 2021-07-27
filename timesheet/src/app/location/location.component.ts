import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LocationService } from '../service/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  Locations: any = [];
  locationForm: FormGroup;
  editForm: FormGroup;
  isDisplayed: boolean = true;
  editorDisplay = true;

  constructor(
    private locationService: LocationService,
    private router: Router,
    public formBuilder: FormBuilder
    ) { 
        this.locationForm = this.formBuilder.group({
          title: ['', [Validators.required, Validators.minLength(3)]],
          sector: ['', [Validators.required]],
        })
        this.editForm = this.formBuilder.group({
          _id: [],
          title: [],
          sector: []
        })
      }

  ngOnInit(): void {
    this.locationService.GetLocations().subscribe(res => {
      this.Locations = res;
    })
  }

  display(){
    if (this.isDisplayed) {
      this.isDisplayed = false;
    }else{
      this.isDisplayed = true;
    }
  }

  onSubmit(): any {
    this.locationService.AddLocation(this.locationForm.value)
    .subscribe(() => {
        console.log('Data added successfully!')
      }, (err) => {
        console.log(err);
    });
  }

  editUser(){
    this.locationService.updateLocation(this.editForm.getRawValue()['_id'], this.editForm.value).subscribe((res) => {
      if (res.result) {
        this.editForm.reset()
        this.router.navigate(['/location']);
      }
    })
  }

  edit(id:any) {
    this.editorDisplay = false;
    this.locationService.GetLocation(id).subscribe(res => {
      this.editForm.setValue({
        _id: res['_id'],
        title: res['title'],
        sector: res['sector']
      });
    });
  }

  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.locationService.deleteLocation(id).subscribe((res) => {
        this.Locations.splice(i, 1);
      })
    }
  }
}
