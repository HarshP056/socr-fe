import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ERPDialogComponent } from './erp-dialog.component';

describe('ERPDialogComponent', () => {
  let component: ERPDialogComponent;
  let fixture: ComponentFixture<ERPDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ERPDialogComponent]
    });
    fixture = TestBed.createComponent(ERPDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
