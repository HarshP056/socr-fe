import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemConfigDetailsComponent } from './system-config-details.component';

describe('SystemConfigDetailsComponent', () => {
  let component: SystemConfigDetailsComponent;
  let fixture: ComponentFixture<SystemConfigDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemConfigDetailsComponent]
    });
    fixture = TestBed.createComponent(SystemConfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
