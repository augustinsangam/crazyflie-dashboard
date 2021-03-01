import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsHistoryComponent } from './missions-history.component';

describe('MissionsHistoryComponent', () => {
  let component: MissionsHistoryComponent;
  let fixture: ComponentFixture<MissionsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
