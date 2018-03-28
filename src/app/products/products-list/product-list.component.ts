import {Component, OnInit} from '@angular/core';
import {Product} from '../product';
import {ProductService} from './product.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit {

  listFilter: string = '';
  private _productService: ProductService;

  productTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  products: Product[] = [];
  errorMessage: string;

  constructor(productService: ProductService, private router: ActivatedRoute) {
    this._productService = productService;
  }

  toogleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this._productService.getProducts()
      .subscribe(
        products => {
          this.products = products;
        },
        error => this.errorMessage = <any>error);

    this.listFilter = this.router.snapshot.queryParams['filterBy'];
    this.showImage = this.router.snapshot.queryParams['showImage'] === 'true';
  }

  onRatingClicked(message: string) {
    this.productTitle = 'Product List ' + message;
  }
}
