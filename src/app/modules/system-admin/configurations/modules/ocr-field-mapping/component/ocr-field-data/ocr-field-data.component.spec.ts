import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrFieldDataComponent } from './ocr-field-data.component';

describe('OcrFieldDataComponent', () => {
  let component: OcrFieldDataComponent;
  let fixture: ComponentFixture<OcrFieldDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcrFieldDataComponent]
    });
    fixture = TestBed.createComponent(OcrFieldDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
