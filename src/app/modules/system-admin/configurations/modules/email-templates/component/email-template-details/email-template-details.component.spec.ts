import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTemplateDetailsComponent } from './email-template-details.component';

describe('EmailTemplateDetailsComponent', () => {
  let component: EmailTemplateDetailsComponent;
  let fixture: ComponentFixture<EmailTemplateDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailTemplateDetailsComponent]
    });
    fixture = TestBed.createComponent(EmailTemplateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
