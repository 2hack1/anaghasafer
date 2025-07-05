import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigWhiteCardComponent } from './big-white-card.component';

describe('BigWhiteCardComponent', () => {
  let component: BigWhiteCardComponent;
  let fixture: ComponentFixture<BigWhiteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigWhiteCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigWhiteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
