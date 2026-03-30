/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MetadataCopyComponent } from './metadata-copy.component';

describe('MetadataCopyComponent', () => {
  let component: MetadataCopyComponent;
  let fixture: ComponentFixture<MetadataCopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataCopyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
