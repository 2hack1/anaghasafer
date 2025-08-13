import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelroominfoComponent } from './hotelroominfo.component';

describe('HotelroominfoComponent', () => {
  let component: HotelroominfoComponent;
  let fixture: ComponentFixture<HotelroominfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelroominfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelroominfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
