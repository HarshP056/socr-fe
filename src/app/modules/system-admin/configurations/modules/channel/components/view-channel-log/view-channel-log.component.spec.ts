import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChannelLogComponent } from './view-channel-log.component';

describe('ViewChannelLogComponent', () => {
  let component: ViewChannelLogComponent;
  let fixture: ComponentFixture<ViewChannelLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewChannelLogComponent]
    });
    fixture = TestBed.createComponent(ViewChannelLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
