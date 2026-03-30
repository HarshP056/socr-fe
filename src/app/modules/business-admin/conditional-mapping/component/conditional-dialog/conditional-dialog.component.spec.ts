import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalDialogComponent } from './conditional-dialog.component';

describe('ConditionalDialogComponent', () => {
  let component: ConditionalDialogComponent;
  let fixture: ComponentFixture<ConditionalDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConditionalDialogComponent]
    });
    fixture = TestBed.createComponent(ConditionalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
