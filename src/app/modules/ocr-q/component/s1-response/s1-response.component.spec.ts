/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { S1ResponseComponent } from './s1-response.component';

describe('S1ResponseComponent', () => {
  let component: S1ResponseComponent;
  let fixture: ComponentFixture<S1ResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ S1ResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(S1ResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
