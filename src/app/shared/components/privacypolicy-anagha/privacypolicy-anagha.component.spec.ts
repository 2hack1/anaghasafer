import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacypolicyAnaghaComponent } from './privacypolicy-anagha.component';

describe('PrivacypolicyAnaghaComponent', () => {
  let component: PrivacypolicyAnaghaComponent;
  let fixture: ComponentFixture<PrivacypolicyAnaghaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacypolicyAnaghaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacypolicyAnaghaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
