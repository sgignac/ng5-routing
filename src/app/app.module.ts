import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Location } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocalizeRouterModule, LocalizeParser, LocalizeRouterSettings } from 'localize-router';
import { LocalizeRouterHttpLoader } from 'localize-router-http-loader';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SummaryComponent } from './components/summary/summary.component';
import { HomeComponent } from './components/home/home.component';
import { CarsComponent } from './components/cars/cars.component';
import { ErrorComponent } from './components/error/error.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/locales/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    HomeComponent,
    CarsComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    AppRoutingModule
  ],
  providers: [],
  entryComponents: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }