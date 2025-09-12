import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatedamountComponent } from './calculatedamount.component';

describe('CalculatedamountComponent', () => {
  let component: CalculatedamountComponent;
  let fixture: ComponentFixture<CalculatedamountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatedamountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatedamountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
