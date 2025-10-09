import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDestinationComponent } from './payment-destination.component';

describe('PaymentDestinationComponent', () => {
  let component: PaymentDestinationComponent;
  let fixture: ComponentFixture<PaymentDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentDestinationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
