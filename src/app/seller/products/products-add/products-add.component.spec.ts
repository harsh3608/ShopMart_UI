import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAddComponent } from './products-add.component';

describe('ProductsAddComponent', () => {
  let component: ProductsAddComponent;
  let fixture: ComponentFixture<ProductsAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsAddComponent]
    });
    fixture = TestBed.createComponent(ProductsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
