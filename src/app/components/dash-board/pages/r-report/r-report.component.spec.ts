import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RReportComponent } from './r-report.component';

describe('RReportComponent', () => {
  let component: RReportComponent;
  let fixture: ComponentFixture<RReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
