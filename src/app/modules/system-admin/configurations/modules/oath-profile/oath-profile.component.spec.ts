import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OathProfileComponent } from './oath-profile.component';

describe('OathProfileComponent', () => {
  let component: OathProfileComponent;
  let fixture: ComponentFixture<OathProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OathProfileComponent]
    });
    fixture = TestBed.createComponent(OathProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
