import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSsoClientConfigComponent } from './save-sso-client-config.component';

describe('SaveSsoClientConfigComponent', () => {
  let component: SaveSsoClientConfigComponent;
  let fixture: ComponentFixture<SaveSsoClientConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveSsoClientConfigComponent]
    });
    fixture = TestBed.createComponent(SaveSsoClientConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
