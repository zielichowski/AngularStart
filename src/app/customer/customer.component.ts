import { Component, OnInit } from '@angular/core';
import {Customer} from './customer';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'pm-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer: Customer = new Customer();
  customerForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.customerForm = new FormGroup({
      fistName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendCatalog: new FormControl(true)

    });
  }

}
