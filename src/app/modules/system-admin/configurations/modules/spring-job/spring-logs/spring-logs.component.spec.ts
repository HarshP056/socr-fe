import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringLogsComponent } from './spring-logs.component';

describe('SpringLogsComponent', () => {
  let component: SpringLogsComponent;
  let fixture: ComponentFixture<SpringLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpringLogsComponent]
    });
    fixture = TestBed.createComponent(SpringLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
