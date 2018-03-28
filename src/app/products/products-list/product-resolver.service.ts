import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Product} from '../product';
import {Observable} from 'rxjs/Observable';
import {ProductService} from './product.service';

@Injectable()
export class ProductResolver implements Resolve<Product> {

  constructor(private productService: ProductService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id = +route.paramMap.get('id');
    return this.productService.getProduct(id);
  }
}
