import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import customers from '../../json/customers.json';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent implements OnInit {

  customers = customers;
  containerToBeLoaded: string;
  newCustomerForm: FormGroup;
  newCustomerFormSubmitted: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if(window.sessionStorage.getItem('customers') === null) {
      window.sessionStorage.setItem('customers', JSON.stringify(customers));
    }

    else {
      this.customers = JSON.parse(window.sessionStorage.getItem('customers'));
    }

    this.containerToBeLoaded = 'cardView';
    this.initForm();
  }

  goToCustomersPage() {
    this.router.navigate(['../customer-page'], {relativeTo: this.route})
  }

  setContainerToBeLoaded(container: string) {
    this.containerToBeLoaded = container;
  }

  initForm() {
    this.newCustomerForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'gender': new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    this.newCustomerFormSubmitted = true;

    if(this.newCustomerForm.invalid === false) {
      const firstName = this.newCustomerForm.get('firstName').value;
      const lastName = this.newCustomerForm.get('lastName').value;
      const customerFlg = this.customers.customers.find(item => item.first_name === firstName && item.last_name === lastName);

      if(customerFlg !== undefined) {
        window.alert('Error: Customer is already added in the Customer Manager Tool.');
        return;
      }
      else {
        const customersJSON = {
          "first_name": firstName,
          "last_name": lastName,
          "address": this.newCustomerForm.get('address').value,
          "gender": this.newCustomerForm.get('gender').value
        }

        this.customers.customers.push(customersJSON);
        window.sessionStorage.setItem('customers', JSON.stringify(this.customers));
        this.newCustomerForm.reset();
        this.newCustomerFormSubmitted = false;
        this.containerToBeLoaded = 'cardView';
      }
    }

    else {
      return;
    }
  }



}