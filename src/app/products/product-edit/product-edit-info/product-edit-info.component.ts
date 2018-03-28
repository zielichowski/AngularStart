import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../product';

@Component({
  selector: 'pm-product-edit-info',
  templateUrl: './product-edit-info.component.html',
  styleUrls: ['./product-edit-info.component.css']
})
export class ProductEditInfoComponent implements OnInit {
  @ViewChild(NgForm) productEditForm: NgForm;
  errorMessage: string;
  product: Product;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.data.subscribe(data => {
      this.product = data['product'];

      if (this.productEditForm) {
        this.productEditForm.reset();
      }
    });
  }

}
