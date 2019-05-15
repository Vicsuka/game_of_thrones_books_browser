import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificHouseComponent } from './specific-house.component';

describe('SpecificHouseComponent', () => {
  let component: SpecificHouseComponent;
  let fixture: ComponentFixture<SpecificHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
