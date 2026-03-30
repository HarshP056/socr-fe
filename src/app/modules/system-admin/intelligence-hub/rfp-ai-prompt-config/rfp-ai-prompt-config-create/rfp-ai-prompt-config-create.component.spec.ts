/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RfpAiPromptConfigCreateComponent } from './rfp-ai-prompt-config-create.component';

describe('RfpAiPromptConfigCreateComponent', () => {
  let component: RfpAiPromptConfigCreateComponent;
  let fixture: ComponentFixture<RfpAiPromptConfigCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfpAiPromptConfigCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfpAiPromptConfigCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
