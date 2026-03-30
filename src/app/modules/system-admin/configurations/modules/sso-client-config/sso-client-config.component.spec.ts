import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoClientConfigComponent } from './sso-client-config.component';

describe('SsoClientConfigComponent', () => {
  let component: SsoClientConfigComponent;
  let fixture: ComponentFixture<SsoClientConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SsoClientConfigComponent]
    });
    fixture = TestBed.createComponent(SsoClientConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
