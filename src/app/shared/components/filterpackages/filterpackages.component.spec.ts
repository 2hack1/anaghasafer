import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterpackagesComponent } from './filterpackages.component';

describe('FilterpackagesComponent', () => {
  let component: FilterpackagesComponent;
  let fixture: ComponentFixture<FilterpackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterpackagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterpackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
