import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardPage } from './dashboard.page';

describe('DashboardPage', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DashboardPage],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DashboardPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
