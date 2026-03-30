import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDocidRangeComponent } from './create-docid-range.component';

describe('CreateDocidRangeComponent', () => {
  let component: CreateDocidRangeComponent;
  let fixture: ComponentFixture<CreateDocidRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDocidRangeComponent]
    });
    fixture = TestBed.createComponent(CreateDocidRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
