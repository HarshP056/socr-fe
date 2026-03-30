/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddDerivationComponent } from './add-derivation.component';

describe('AddDerivationComponent', () => {
  let component: AddDerivationComponent;
  let fixture: ComponentFixture<AddDerivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDerivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDerivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
