import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetpasspopupComponent } from './forgetpasspopup.component';

describe('ForgetpasspopupComponent', () => {
  let component: ForgetpasspopupComponent;
  let fixture: ComponentFixture<ForgetpasspopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgetpasspopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetpasspopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
