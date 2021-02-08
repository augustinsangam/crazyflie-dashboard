import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodePage } from './code.page';


describe('MissionsComponent', () => {
  let component: CodePage;
  let fixture: ComponentFixture<CodePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
