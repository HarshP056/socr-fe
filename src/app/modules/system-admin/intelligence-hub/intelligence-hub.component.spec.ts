import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntelligenceHubComponent } from './intelligence-hub.component';
describe('IntelligenceHubComponent', () => {
  let component: IntelligenceHubComponent;
  let fixture: ComponentFixture<IntelligenceHubComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntelligenceHubComponent]
    });
    fixture = TestBed.createComponent(IntelligenceHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
