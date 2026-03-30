import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicalSystemsComponent } from './logical-systems.component';

describe('LogicalSystemsComponent', () => {
  let component: LogicalSystemsComponent;
  let fixture: ComponentFixture<LogicalSystemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogicalSystemsComponent]
    });
    fixture = TestBed.createComponent(LogicalSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
