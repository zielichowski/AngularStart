import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditDetailsComponent } from './product-edit-details.component';

describe('ProductEditDetailsComponent', () => {
  let component: ProductEditDetailsComponent;
  let fixture: ComponentFixture<ProductEditDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEditDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
