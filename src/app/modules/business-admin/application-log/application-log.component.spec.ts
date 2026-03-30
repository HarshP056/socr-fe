import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationLogComponent } from './application-log.component';

describe('ApplicationLogComponent', () => {
  let component: ApplicationLogComponent;
  let fixture: ComponentFixture<ApplicationLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationLogComponent]
    });
    fixture = TestBed.createComponent(ApplicationLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
