import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicEmailComponent } from './basic-email.component';

describe('BasicEmailComponent', () => {
  let component: BasicEmailComponent;
  let fixture: ComponentFixture<BasicEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicEmailComponent]
    });
    fixture = TestBed.createComponent(BasicEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
