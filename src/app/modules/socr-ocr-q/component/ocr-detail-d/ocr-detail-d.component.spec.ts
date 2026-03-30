import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrDetailsDComponent } from './ocr-detail-d.component';

describe('OcrDetailsDComponent', () => {
  let component: OcrDetailsDComponent;
  let fixture: ComponentFixture<OcrDetailsDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcrDetailsDComponent]
    });
    fixture = TestBed.createComponent(OcrDetailsDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
