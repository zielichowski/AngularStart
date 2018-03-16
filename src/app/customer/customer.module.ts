import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { CustomerComponent } from './customer.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'customer', component: CustomerComponent},
    ]),
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [CustomerComponent]
})
export class CustomerModule { }
