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
  errorMsg: any;

  constructor(
    private locationService: LocationService,
    private router: Router,
    public formBuilder: FormBuilder
    ) { 
        this.locationForm = this.formBuilder.group({
          title: ['', [Validators.required, Validators.minLength(2)]],
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
    this.locationService.AddLocation(this.locationForm.value).subscribe(
      (data) => {
        this.Locations = data;
        console.log(this.Locations);
        this.locationService.GetLocations().subscribe(
          (data) => this.Locations = data,
          (error) => this.errorMsg = error
        )

      }, (err) => {
        console.log(err);
    });
  }

  editUser(){
    this.locationService.updateLocation(this.editForm.getRawValue()['_id'], this.editForm.value).subscribe((res) => {
      if (res.result) {
        this.editForm.reset()
      }
      this.editorDisplay = !this.editorDisplay
      this.locationService.GetLocations().subscribe(
        (data) => this.Locations = data,
        (error) => this.errorMsg = error
      )
    })
  }

  edit(id:any) {
    this.editorDisplay = !this.editorDisplay;
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

  get title() {
    return this.locationForm.get('title');
  }

  get sector() {
    return this.locationForm.get('sector');
  }
}
