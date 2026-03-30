import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrQComponent } from './ocr-q.component';

describe('OcrQComponent', () => {
  let component: OcrQComponent;
  let fixture: ComponentFixture<OcrQComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcrQComponent]
    });
    fixture = TestBed.createComponent(OcrQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
