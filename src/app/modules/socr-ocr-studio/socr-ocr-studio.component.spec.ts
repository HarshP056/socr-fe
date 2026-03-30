import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocrOcrStudioComponent } from './socr-ocr-studio.component';

describe('SocrOcrStudioComponent', () => {
  let component: SocrOcrStudioComponent;
  let fixture: ComponentFixture<SocrOcrStudioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocrOcrStudioComponent]
    });
    fixture = TestBed.createComponent(SocrOcrStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
