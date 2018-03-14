
import {Injectable} from '@angular/core';
import {Product} from './product';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';


@Injectable()
export class ProductService {

  private _productUrl = './api/products/products.json'

  constructor(private _http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this._productUrl)
      .do(data => console.log('All : ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getProduct(productId: number): Observable<Product> {
    return this._http.get<Product[]>(this._productUrl)
      .map((products: Product[]) => products.find(p => p.productId === productId));
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);

  }
}
