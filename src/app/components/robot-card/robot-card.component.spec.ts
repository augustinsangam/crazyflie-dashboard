import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RobotCardComponent } from './robot-card.component';


describe('RobotCardComponent', () => {
  let component: RobotCardComponent;
  let fixture: ComponentFixture<RobotCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RobotCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
