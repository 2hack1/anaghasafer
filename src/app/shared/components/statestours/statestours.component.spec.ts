import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatestoursComponent } from './statestours.component';

describe('StatestoursComponent', () => {
  let component: StatestoursComponent;
  let fixture: ComponentFixture<StatestoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatestoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatestoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
