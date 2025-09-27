import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConditionOfAnaghaComponent } from './terms-and-condition-of-anagha.component';

describe('TermsAndConditionOfAnaghaComponent', () => {
  let component: TermsAndConditionOfAnaghaComponent;
  let fixture: ComponentFixture<TermsAndConditionOfAnaghaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsAndConditionOfAnaghaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsAndConditionOfAnaghaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
