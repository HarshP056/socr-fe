/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OcrProjectComponent } from './ocr-project.component';

describe('OcrProjectComponent', () => {
  let component: OcrProjectComponent;
  let fixture: ComponentFixture<OcrProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcrProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcrProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
