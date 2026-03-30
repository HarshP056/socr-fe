import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrDetailsBComponent } from './ocr-detail-b.component';

describe('OcrDetailsBComponent', () => {
  let component: OcrDetailsBComponent;
  let fixture: ComponentFixture<OcrDetailsBComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcrDetailsBComponent]
    });
    fixture = TestBed.createComponent(OcrDetailsBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
