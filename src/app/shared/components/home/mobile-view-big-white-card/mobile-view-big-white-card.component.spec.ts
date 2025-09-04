import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileViewBigWhiteCardComponent } from './mobile-view-big-white-card.component';

describe('MobileViewBigWhiteCardComponent', () => {
  let component: MobileViewBigWhiteCardComponent;
  let fixture: ComponentFixture<MobileViewBigWhiteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileViewBigWhiteCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileViewBigWhiteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
