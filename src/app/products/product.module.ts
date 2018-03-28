import {NgModule} from '@angular/core';
import {ProductListComponent} from './products-list/product-list.component';
import {ProductDetailsComponent} from './product-detail/product-details.component';
import {ConvertToSpacesPipe} from '../shared/convert-to-spaces.pipe';
import {RouterModule} from '@angular/router';
import {ProductGuardService} from './products-list/product-guard.service';
import {ProductService} from './products-list/product.service';
import {SharedModule} from './../shared/shared.module';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProductData} from './product-data';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {ProductFilterPipe} from './products-list/product-filter.pipe';
import {ProductResolver} from './products-list/product-resolver.service';
import { ProductEditInfoComponent } from './product-edit/product-edit-info/product-edit-info.component';
import { ProductEditDetailsComponent } from './product-edit/product-edit-details/product-edit-details.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(ProductData),
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {
        path: 'products/:id',
        canActivate: [ProductGuardService],
        component: ProductDetailsComponent,
        resolve: {'product': ProductResolver}
      },
      {
        path: 'products/:id/edit',
        canActivate: [ProductGuardService],
        component: ProductEditComponent,
        resolve: {'product': ProductResolver},
        children: [
          {
            path: '', redirectTo: 'info', pathMatch: 'full'
          },
          {
            path: 'info', component: ProductEditInfoComponent
          },
          {
            path: 'details', component: ProductEditDetailsComponent
          }
        ]
      },

    ]),

  ],
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ConvertToSpacesPipe,
    ProductEditComponent,
    ProductFilterPipe,
    ProductEditInfoComponent,
    ProductEditDetailsComponent
  ],
  providers: [
    ProductGuardService,
    ProductService,
    ProductResolver
  ]
})
export class ProductModule {
}
