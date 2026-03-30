import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDocumentViewerComponent } from './pdf-document-viewer.component';

describe('PdfDocumentViewerComponent', () => {
  let component: PdfDocumentViewerComponent;
  let fixture: ComponentFixture<PdfDocumentViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfDocumentViewerComponent]
    });
    fixture = TestBed.createComponent(PdfDocumentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
