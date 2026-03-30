import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartKeySystemComponent } from './smart-key-system.component';

describe('SmartKeySystemComponent', () => {
  let component: SmartKeySystemComponent;
  let fixture: ComponentFixture<SmartKeySystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartKeySystemComponent]
    });
    fixture = TestBed.createComponent(SmartKeySystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
