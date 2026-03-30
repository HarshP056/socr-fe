import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDialogComponent } from './application-dialog.component';

describe('ApplicationDialogComponent', () => {
  let component: ApplicationDialogComponent;
  let fixture: ComponentFixture<ApplicationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationDialogComponent]
    });
    fixture = TestBed.createComponent(ApplicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
