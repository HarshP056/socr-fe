import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobLogsComponent } from './job-logs.component';

describe('JobLogsComponent', () => {
  let component: JobLogsComponent;
  let fixture: ComponentFixture<JobLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobLogsComponent]
    });
    fixture = TestBed.createComponent(JobLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
