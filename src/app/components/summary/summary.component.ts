import { ApplicationContextService } from './../../services/application-context.service';
import { Component, OnInit } from '@angular/core';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(private localize: LocalizeRouterService, private _ctx:ApplicationContextService) { }

  changeLanguage(lang: string) {
    let prov = "-" + this._ctx.appContext.province.toLowerCase();
    this.localize.changeLanguage(lang + prov);
  }
  changeProvince(prov: string) {
    this._ctx.appContext.province = prov;
    let lang = this._ctx.appContext.language.toLowerCase() + "-" ;
    this.localize.changeLanguage(lang + prov);
  }

  ngOnInit() {
  }

}
