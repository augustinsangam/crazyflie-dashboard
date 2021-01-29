import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MissionsPage } from './missions.component';


describe('MissionsComponent', () => {
  let component: MissionsPage;
  let fixture: ComponentFixture<MissionsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionsPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
