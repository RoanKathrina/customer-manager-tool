import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import customers from '../../json/customers.json';

@Component({
  selector: 'app-new-customer-page',
  templateUrl: './new-customer-page.component.html',
  styleUrls: ['./new-customer-page.component.css']
})
export class NewCustomerPageComponent implements OnInit {

  newCustomerForm: FormGroup;
  newCustomerFormSubmitted: boolean = false;
  customers = customers;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    if(window.sessionStorage.getItem('customers') !== null) {
      this.customers = JSON.parse(window.sessionStorage.getItem('customers'));
    }
    else {
      window.sessionStorage.setItem('customers', JSON.stringify(this.customers));
    }
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
      console.log(customerFlg);
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
        this.router.navigate(['../customer-page'], {relativeTo: this.route})
      }
    }

    else {
      return;
    }
  }


}