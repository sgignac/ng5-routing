import { ApplicationContextService } from './services/application-context.service';
import { Routes, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SummaryComponent } from './components/summary/summary.component';
import { HomeComponent } from './components/home/home.component';
import { CarsComponent } from './components/cars/cars.component';
import { ErrorComponent } from './components/error/error.component';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private _ctx:ApplicationContextService, private localize: LocalizeRouterService){
    // this language will be used as a fallback when a translation isn't found in the current language
    //translate.setDefaultLang('en');
     
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    //translate.use('en');

    console.log('context', this._ctx.appContext);
    localize.changeLanguage(this._ctx.appContext.locales);
  }

  ngOnInit(){

  }

}

