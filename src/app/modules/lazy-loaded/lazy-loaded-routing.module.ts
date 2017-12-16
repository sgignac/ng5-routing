import { TranslateModule } from '@ngx-translate/core';
import { LazyModTwoComponent } from './lazy-mod-two/lazy-mod-two.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LazyModOneComponent } from './lazy-mod-one/lazy-mod-one.component';
import { LocalizeRouterModule } from 'localize-router';

const routes: Routes = [
  { path: "", component: LazyModOneComponent, pathMatch: "full" },
  { path: "two", component: LazyModTwoComponent}
];

@NgModule({
  imports: [
    TranslateModule,
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LazyLoadedRoutingModule { }
