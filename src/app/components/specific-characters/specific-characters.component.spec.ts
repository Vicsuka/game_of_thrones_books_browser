import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificCharactersComponent } from './specific-characters.component';

describe('SpecificCharactersComponent', () => {
  let component: SpecificCharactersComponent;
  let fixture: ComponentFixture<SpecificCharactersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificCharactersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
