import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrFieldMappingComponent } from './ocr-field-mapping.component';

describe('OcrFieldMappingComponent', () => {
  let component: OcrFieldMappingComponent;
  let fixture: ComponentFixture<OcrFieldMappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcrFieldMappingComponent]
    });
    fixture = TestBed.createComponent(OcrFieldMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
