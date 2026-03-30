import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrBoundingBoxComponent } from './bounding-box.component';

describe('OcrBoundingBoxComponent', () => {
  let component: OcrBoundingBoxComponent;
  let fixture: ComponentFixture<OcrBoundingBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcrBoundingBoxComponent]
    });
    fixture = TestBed.createComponent(OcrBoundingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
