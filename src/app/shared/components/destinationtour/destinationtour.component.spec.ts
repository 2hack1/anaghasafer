import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationtourComponent } from './destinationtour.component';

describe('DestinationtourComponent', () => {
  let component: DestinationtourComponent;
  let fixture: ComponentFixture<DestinationtourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationtourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationtourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
