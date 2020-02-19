import { Component, OnInit } from '@angular/core';

import customers from '../../json/customers.json';
@Component({
  selector: 'app-customer-page-list-view',
  templateUrl: './customer-page-list-view.component.html',
  styleUrls: ['./customer-page-list-view.component.css']
})
export class CustomerPageListViewComponent implements OnInit {

  customers = customers;
  constructor() { }

  ngOnInit() {
    if(window.sessionStorage.getItem('customers') !== null) {
      this.customers = JSON.parse(window.sessionStorage.getItem('customers'));
    }
    else {
      window.sessionStorage.setItem('customers', JSON.stringify(this.customers));
    }
  }

}