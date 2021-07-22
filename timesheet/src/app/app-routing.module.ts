import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationAddComponent } from './location-add/location-add.component';
import { LocationEditComponent } from './location-edit/location-edit.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationViewComponent } from './location-view/location-view.component';

import { AuthGuard } from './shared/auth.guard';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { TimecardComponent } from './timecard/timecard.component';
import { DoctorComponent } from './doctor/doctor.component';
import { LocationComponent } from './location/location.component';

const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full'},
  { path: 'log-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'user-profile/:id', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'timecard/:id', component: TimecardComponent, canActivate: [AuthGuard]},
  { path: 'doctor', component: DoctorComponent, canActivate: [AuthGuard]},
  { path: 'locations', component: LocationListComponent, canActivate: [AuthGuard],
    children: [
      { path: 'edit/:id', component: LocationEditComponent},
      { path: 'view/:id', component: LocationViewComponent},
      { path: 'add', component: LocationAddComponent}
    ]},
  //{ path: '**', component: LocationListComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
