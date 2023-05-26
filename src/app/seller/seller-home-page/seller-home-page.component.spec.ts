import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerHomePageComponent } from './seller-home-page.component';

describe('SellerHomePageComponent', () => {
  let component: SellerHomePageComponent;
  let fixture: ComponentFixture<SellerHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerHomePageComponent]
    });
    fixture = TestBed.createComponent(SellerHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
