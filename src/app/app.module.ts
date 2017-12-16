import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, APP_INITIALIZER } from '@angular/core';

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
import { ApplicationContextService } from './services/application-context.service';

//Factory to load the application context at bootstrap
export function applicationContextServiceFactory(appContextService: ApplicationContextService): Function {
  console.log('1- ');
  return () => appContextService.initContext();
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient, ctx:ApplicationContextService) {
  console.log('2- HERERER', ctx.appContext);
  let ptx = ctx.getContextId();
  return new TranslateHttpLoader(http, '/assets/locales/' + ptx + '/', '.json');
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
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient, ApplicationContextService]
      }
    })
  ],
  providers: [
    ApplicationContextService,
    {
      provide: APP_INITIALIZER,
      useFactory: applicationContextServiceFactory,
      deps: [ApplicationContextService],
      multi: true
    }
  ],
  entryComponents: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }