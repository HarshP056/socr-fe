import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OathDialogComponent } from './oath-dialog.component';

describe('OathDialogComponent', () => {
  let component: OathDialogComponent;
  let fixture: ComponentFixture<OathDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OathDialogComponent]
    });
    fixture = TestBed.createComponent(OathDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
