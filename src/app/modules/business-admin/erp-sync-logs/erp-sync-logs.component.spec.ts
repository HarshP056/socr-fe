import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ERPSyncLogsComponent } from './erp-sync-logs.component';

describe('ErrorLogsComponent', () => {
  let component: ERPSyncLogsComponent;
  let fixture: ComponentFixture<ERPSyncLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ERPSyncLogsComponent]
    });
    fixture = TestBed.createComponent(ERPSyncLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
