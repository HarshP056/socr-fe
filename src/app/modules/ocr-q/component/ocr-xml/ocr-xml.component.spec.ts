import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrXmlComponent } from './ocr-xml.component';

describe('OcrXmlComponent', () => {
  let component: OcrXmlComponent;
  let fixture: ComponentFixture<OcrXmlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcrXmlComponent]
    });
    fixture = TestBed.createComponent(OcrXmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
