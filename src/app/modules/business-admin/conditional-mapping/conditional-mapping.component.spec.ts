import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalMappingComponent } from './conditional-mapping.component';

describe('ConditionalMappingComponent', () => {
  let component: ConditionalMappingComponent;
  let fixture: ComponentFixture<ConditionalMappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConditionalMappingComponent]
    });
    fixture = TestBed.createComponent(ConditionalMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
