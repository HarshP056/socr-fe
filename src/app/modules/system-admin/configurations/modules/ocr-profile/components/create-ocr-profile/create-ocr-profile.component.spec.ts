import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOcrProfileComponent } from './create-ocr-profile.component';

describe('CreateOcrProfileComponent', () => {
  let component: CreateOcrProfileComponent;
  let fixture: ComponentFixture<CreateOcrProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOcrProfileComponent]
    });
    fixture = TestBed.createComponent(CreateOcrProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
