import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringJobComponent } from './spring-job.component';

describe('SpringJobComponent', () => {
  let component: SpringJobComponent;
  let fixture: ComponentFixture<SpringJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpringJobComponent]
    });
    fixture = TestBed.createComponent(SpringJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
