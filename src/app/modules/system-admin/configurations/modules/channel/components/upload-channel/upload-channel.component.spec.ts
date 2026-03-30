/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UploadChannelComponent } from './upload-channel.component';

describe('UploadChannelComponent', () => {
  let component: UploadChannelComponent;
  let fixture: ComponentFixture<UploadChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
