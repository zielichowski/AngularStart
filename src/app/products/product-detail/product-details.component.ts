import {Component, OnInit} from '@angular/core';
import {Product} from '../product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../products-list/product.service';
import {ProductResolver} from "../products-list/product-resolver.service";

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
    this.product = this._route.snapshot.data['product'];
    const id = +this._route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
  }

  onBack(): void {
    this._router.navigate(['/products'],
      {queryParamsHandling: 'preserve'});
  }

}
