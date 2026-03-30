import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrDetailsCComponent } from './ocr-detail-c.component';

describe('OcrDetailsCComponent', () => {
  let component: OcrDetailsCComponent;
  let fixture: ComponentFixture<OcrDetailsCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcrDetailsCComponent]
    });
    fixture = TestBed.createComponent(OcrDetailsCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
