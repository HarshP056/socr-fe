import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartstoreConfigComponent } from './smartstore-config.component';

describe('SmartstoreConfigComponent', () => {
  let component: SmartstoreConfigComponent;
  let fixture: ComponentFixture<SmartstoreConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartstoreConfigComponent]
    });
    fixture = TestBed.createComponent(SmartstoreConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
