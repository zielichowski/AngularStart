import {Injectable} from '@angular/core';
import {Product} from '../product';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {Http, Response, Headers, RequestOptions} from '@angular/http';


@Injectable()
export class ProductService {

  private baseUrl = 'api/products';

  constructor(private _http: Http) {
  }

  getProducts(): Observable<Product[]> {
    return this._http.get(this.baseUrl)
      .map(this.extractData)
      .do(data => console.log('All : ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getProduct(productId: number): Observable<Product> {
    const url = `${this.baseUrl}/${productId}`;
    return this._http.get(url)
      .map(this.extractData)
      .do(data => console.log('getProduct: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);

  }

  private extractData(response: Response) {
    const body = response.json();
    return body.data || {};
  }

  saveProduct(p: Product): Observable<Product> {
    const url = `${this.baseUrl}/${p.id}`;

    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

   return this._http.put(url, p, options)
      .map(() => p)
      .do(data => console.log('updateProduct: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
}
