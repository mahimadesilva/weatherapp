import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';
import { ViewCityComponent } from './view-city/view-city.component';

const routes: Routes = [
  {path: '', component: CitiesComponent},
  {path: ':index', component: ViewCityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
