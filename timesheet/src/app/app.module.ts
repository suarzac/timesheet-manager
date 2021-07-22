import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './service/authconfig.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { TimecardComponent } from './timecard/timecard.component';
import { DoctorComponent } from './doctor/doctor.component';

import { LocationListComponent } from './location-list/location-list.component';
import { LocationViewComponent } from './location-view/location-view.component';
import { LocationAddComponent } from './location-add/location-add.component';
import { LocationEditComponent } from './location-edit/location-edit.component';
import { LocationService } from './service/location.service';

import { UserService } from './service/user.service';

import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimesheetListComponent } from './timesheet-list/timesheet-list.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SigninComponent,
    SignupComponent,
    TimecardComponent,
    DoctorComponent,
    LocationListComponent,
    LocationViewComponent,
    LocationAddComponent,
    LocationEditComponent,
    TimesheetListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    NoopAnimationsModule,
  ],
  providers: [LocationService, UserService,
    
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }],
  bootstrap: [AppComponent]
})
export class AppModule { }
