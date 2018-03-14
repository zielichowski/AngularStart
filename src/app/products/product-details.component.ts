import {Component, OnInit} from '@angular/core';
import {Product} from './product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from './product.service';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  pageTitle: string = 'Product details';
  product: Product;

  constructor(private _route: ActivatedRoute, private _router: Router, private _productService: ProductService) {
  }

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id');
    this._productService.getProduct(id)
      .subscribe(product => this.product = product);
    this.pageTitle += `: ${id}`;
  }

  onBack(): void {
    this._router.navigate(['/products']);
  }

}
