import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyLoadedRoutingModule } from './lazy-loaded-routing.module';
import { LazyModOneComponent } from './lazy-mod-one/lazy-mod-one.component';
import { LazyModTwoComponent } from './lazy-mod-two/lazy-mod-two.component';

@NgModule({
  imports: [
    CommonModule,
    LazyLoadedRoutingModule
  ],
  declarations: [LazyModOneComponent, LazyModTwoComponent]
})
export class LazyLoadedModule { }
