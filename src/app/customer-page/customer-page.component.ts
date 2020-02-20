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
  editCustomerForm: FormGroup;
  indexToBeUpdated = null;
  editCustomerFormSubmitted: boolean = false;

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

    this.editCustomerForm = new FormGroup({
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


  deleteCustomer(firstName: string, lastName: string) {
    // Find the index of the customer to be deleted
    // Delete the customer in the list
    // Update sessionStorage with the current list
    // Set containerToBeLoaded = 'cardView'
    const confirmMsgRes = window.confirm(`Warning: Are you sure you like to delete: ${firstName} ${lastName}?`);
    if(confirmMsgRes === false) {
      return;
    }
    else {
      const customers = JSON.parse(window.sessionStorage.getItem('customers'));
      const customerIndx = customers.customers.findIndex(item => item.first_name === firstName && item.last_name === lastName);
      console.log(customerIndx);

      customers.customers.splice(customerIndx, 1);
      window.sessionStorage.setItem('customers', JSON.stringify(customers));
      this.customers = JSON.parse(window.sessionStorage.getItem('customers'));
    }
  }

  editCustomer(customer, position) {
    // Set the First Name, Last Name, Address, and gender
    this.indexToBeUpdated = position;
    
    const confirmMsgRes = window.confirm(`Warning: Are you sure you want to edit the details of Customer: ${customer.first_name} ${customer.last_name}?`);
    if (confirmMsgRes == false) {
      return;
    } 
    else {
      this.editCustomerForm.patchValue({
        'firstName': customer.first_name,
        'lastName': customer.last_name,
        'address': customer.address,
        'gender': customer.gender
      })
    }
  }

  onUpdateCustomer() {
    this.editCustomerFormSubmitted = true;
    if (this.editCustomerForm.invalid === false) {
      // Check if the First Name, and Last Name already exists in the sessionStorage
      // If no:
        // Update the customers
      // If yes:
        // Alert Error: Customer First Name Last Name already exists in Customer Manager Tool;
        // return;

      const customers = JSON.parse(window.sessionStorage.getItem('customers'));
      const firstName = this.editCustomerForm.get('firstName').value;
      const lastName = this.editCustomerForm.get('lastName').value;
      let i = 0, customerFlg = false;

      for(i = 0; i < customers.customers.length; i++) {
        if(i == this.indexToBeUpdated) {
          continue;
        }
        else {
          if (customers.customers[i]['first_name'] === firstName && customers.customers[i]['last_name'] === lastName) {
            customerFlg = true;
            break;
          }
        }
      }
      if (customerFlg === false) {
        const customerJSON = {
          "first_name": firstName,
          "last_name": lastName,
          "address": this.editCustomerForm.get('address').value,
          "gender": this.editCustomerForm.get('gender').value
        }

        customers.customers[this.indexToBeUpdated] = customerJSON;
        this.customers = customers;
        window.sessionStorage.setItem('customers', JSON.stringify(this.customers));
        this.indexToBeUpdated = null;
        this.editCustomerFormSubmitted = false;
        this.editCustomerForm.reset();
      }
      else {
        window.alert(`Error: Customer: ${firstName} ${lastName} already exists in the Customer Manager Tool Database.`)
        return;
      }
    }
    else {
      return;
    }
  }
}