import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationAddComponent } from './location-add/location-add.component';
import { LocationEditComponent } from './location-edit/location-edit.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationViewComponent } from './location-view/location-view.component';

import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'locations', component: LocationListComponent,
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
