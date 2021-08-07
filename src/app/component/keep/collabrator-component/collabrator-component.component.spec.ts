import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabratorComponentComponent } from './collabrator-component.component';

describe('CollabratorComponentComponent', () => {
  let component: CollabratorComponentComponent;
  let fixture: ComponentFixture<CollabratorComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollabratorComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabratorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
