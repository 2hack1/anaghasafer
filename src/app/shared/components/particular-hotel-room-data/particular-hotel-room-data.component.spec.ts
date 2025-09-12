import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticularHotelRoomDataComponent } from './particular-hotel-room-data.component';

describe('ParticularHotelRoomDataComponent', () => {
  let component: ParticularHotelRoomDataComponent;
  let fixture: ComponentFixture<ParticularHotelRoomDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticularHotelRoomDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticularHotelRoomDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
