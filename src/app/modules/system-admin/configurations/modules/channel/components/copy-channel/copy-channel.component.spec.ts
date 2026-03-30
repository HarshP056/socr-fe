/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CopyChannelComponent } from './copy-channel.component';

describe('CopyChannelComponent', () => {
  let component: CopyChannelComponent;
  let fixture: ComponentFixture<CopyChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
