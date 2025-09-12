import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeatailsComponent } from './view-deatails.component';

describe('ViewDeatailsComponent', () => {
  let component: ViewDeatailsComponent;
  let fixture: ComponentFixture<ViewDeatailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDeatailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDeatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
