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
  }

}