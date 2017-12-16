import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyModTwoComponent } from './lazy-mod-two.component';

describe('LazyModTwoComponent', () => {
  let component: LazyModTwoComponent;
  let fixture: ComponentFixture<LazyModTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyModTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyModTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
