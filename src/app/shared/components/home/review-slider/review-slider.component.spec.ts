import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSliderComponent } from './review-slider.component';

describe('ReviewSliderComponent', () => {
  let component: ReviewSliderComponent;
  let fixture: ComponentFixture<ReviewSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
