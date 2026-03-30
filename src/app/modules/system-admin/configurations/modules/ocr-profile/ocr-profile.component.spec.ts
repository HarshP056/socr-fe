import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrProfileComponent } from './ocr-profile.component';

describe('OcrProfileComponent', () => {
  let component: OcrProfileComponent;
  let fixture: ComponentFixture<OcrProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcrProfileComponent]
    });
    fixture = TestBed.createComponent(OcrProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
