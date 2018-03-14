import {Component, OnInit} from '@angular/core';
import {Product} from './product';
import {ProductService} from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit {

  private _listFilter: string = '';
  private _productService: ProductService;

  productTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  filteredProducts: Product[];
  products: Product[] = [];
  errorMessage: string;

  constructor(productService: ProductService) {
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
          this.filteredProducts = this.products;
        }
        ,
        error => this.errorMessage = <any>error);

  }

  private performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);

  }

  onRatingClicked(message: string) {
    this.productTitle = 'Product List ' + message;
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

}
