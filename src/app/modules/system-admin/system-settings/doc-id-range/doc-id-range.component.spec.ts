import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocIdRangeComponent } from './doc-id-range.component';

describe('DocIdRangeComponent', () => {
  let component: DocIdRangeComponent;
  let fixture: ComponentFixture<DocIdRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocIdRangeComponent]
    });
    fixture = TestBed.createComponent(DocIdRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
