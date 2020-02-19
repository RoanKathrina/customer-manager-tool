import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import customers from '../../json/customers.json';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent implements OnInit {

  customers = customers;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if(window.sessionStorage.getItem('customers') === null) {
      window.sessionStorage.setItem('customers', JSON.stringify(customers));
    }

    else {
      this.customers = JSON.parse(window.sessionStorage.getItem('customers'));
    }
  }

  goToCustomersPage() {
    this.router.navigate(['../customer-page'], {relativeTo: this.route})
  }
}