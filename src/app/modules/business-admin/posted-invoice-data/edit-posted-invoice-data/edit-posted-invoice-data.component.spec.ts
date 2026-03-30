/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditPostedInvoiceDataComponent } from './edit-posted-invoice-data.component';

describe('EditPostedInvoiceDataComponent', () => {
  let component: EditPostedInvoiceDataComponent;
  let fixture: ComponentFixture<EditPostedInvoiceDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPostedInvoiceDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPostedInvoiceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
