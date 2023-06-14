import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPoolComponent } from './products-pool.component';

describe('ProductsPoolComponent', () => {
  let component: ProductsPoolComponent;
  let fixture: ComponentFixture<ProductsPoolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsPoolComponent]
    });
    fixture = TestBed.createComponent(ProductsPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
