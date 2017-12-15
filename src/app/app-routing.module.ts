import { LocalizeRouterHttpLoader } from 'localize-router-http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ErrorComponent } from './components/error/error.component';
import { CarsComponent } from './components/cars/cars.component';
import { HomeComponent } from './components/home/home.component';
import { SummaryComponent } from './components/summary/summary.component';
import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import { LocalizeRouterModule, LocalizeParser, LocalizeRouterSettings } from 'localize-router';
import { Location } from '@angular/common';

export function HttpLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings, http: HttpClient) {
  return new LocalizeRouterHttpLoader(translate, location, settings, http);
}
const routes: Routes = [
  { path: "", redirectTo: "/summary", pathMatch: "full" },
  { path: "summary", component: SummaryComponent },
  { path: "home", component: HomeComponent },
  { path: "cars", component: CarsComponent },
  { path: "error", component: ErrorComponent },
  { path: "**", redirectTo: "/error", pathMatch: "full" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: HttpLoaderFactory,
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient]
      }
    })],
  exports: [RouterModule, LocalizeRouterModule]
})
export class AppRoutingModule { 

  constructor(){
    
  }

}
