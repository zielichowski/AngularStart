import {NgModule} from '@angular/core';
import {ProductListComponent} from './product-list.component';
import {ProductDetailsComponent} from './product-details.component';
import {ConvertToSpacesPipe} from '../shared/convert-to-spaces.pipe';
import {RouterModule} from '@angular/router';
import {ProductGuardService} from './product-guard.service';
import {ProductService} from './product.service';
import {SharedModule} from './../shared/shared.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProductData} from './product-data';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(ProductData),
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {path: 'products/:id', canActivate: [ProductGuardService], component: ProductDetailsComponent},
      {path: 'productsEdit/:id', canActivate: [ProductGuardService], component: ProductEditComponent},

    ]),

  ],
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ConvertToSpacesPipe,
    ProductEditComponent
  ],
  providers: [
    ProductGuardService,
    ProductService
  ]
})
export class ProductModule { }
