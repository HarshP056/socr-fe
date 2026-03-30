import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLogicalSystemComponent } from './create-logical-system.component';

describe('CreateLogicalSystemComponent', () => {
  let component: CreateLogicalSystemComponent;
  let fixture: ComponentFixture<CreateLogicalSystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLogicalSystemComponent]
    });
    fixture = TestBed.createComponent(CreateLogicalSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
