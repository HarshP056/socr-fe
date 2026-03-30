import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggeredJobsComponent } from './triggered-jobs.component';

describe('TriggeredJobsComponent', () => {
  let component: TriggeredJobsComponent;
  let fixture: ComponentFixture<TriggeredJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TriggeredJobsComponent]
    });
    fixture = TestBed.createComponent(TriggeredJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
