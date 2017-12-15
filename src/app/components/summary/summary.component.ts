import { Component, OnInit } from '@angular/core';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(private localize: LocalizeRouterService) { }

  changeLanguage(lang: string) {
    this.localize.changeLanguage(lang);
  }

  ngOnInit() {
  }

}
