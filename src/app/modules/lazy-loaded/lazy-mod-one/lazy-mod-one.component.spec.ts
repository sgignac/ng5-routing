import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyModOneComponent } from './lazy-mod-one.component';

describe('LazyModOneComponent', () => {
  let component: LazyModOneComponent;
  let fixture: ComponentFixture<LazyModOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyModOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyModOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
