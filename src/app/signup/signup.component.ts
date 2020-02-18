import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import membersJSONFile from '../../json/members.json';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    try{
      const membersTemp = window.sessionStorage.getItem('members');
    } catch(err) {
      window.sessionStorage.clear();
      window.sessionStorage.setItem('members', JSON.stringify(membersJSONFile));
    }
  }

  initForm() {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'confirmPassword': new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    // Check Usernamee
    // Check Password
    // Check Confirm password
    console.log(JSON.parse(window.sessionStorage.getItem('members')));
    const username = this.signupForm.get('username').value;
    const password = this.signupForm.get('password').value;
    const confirmPassword = this.signupForm.get('confirmPassword').value;

    if(username === null) {
      window.alert('Error: Kindly input Username.');
      return;
    }

    else if (username !== null && password === null) {
      window.alert('Error: Kindly input Password.');
      return;
    }

    else if (username !== null && password !== null && confirmPassword === null) {
      window.alert('Error: Kindly input Confirm Password.');
      return;
    }

    else if(username !== null && password !== null && confirmPassword !== null) {
      if(password !== confirmPassword) {
        window.alert('Error: Password, and Confirm Password did not match.')
        return;
      }
      else {
        // Check if the Username is already added in members.json file
          // If no, add the Username, and the password
          // If yes, prompt an Error Message -> exit
        // Add the Username, and Password in members.json file
        const members = JSON.parse(window.sessionStorage.getItem('members'));
        let memberFlg = members.members.find(item => item.username === username);
        if(memberFlg === undefined) {
          // Add the new member in the members.json file
          const memberJSON = {
            "username": username,
            "password": password
          }
          members.members.push(memberJSON);
          window.sessionStorage.setItem('members', JSON.stringify(members));
          this.signupForm.reset();
          this.router.navigate(['../customer-page'], {relativeTo: this.route})
        }
        else {
          window.alert('Error: New member is already added in the Customer Management Tool.')
          return;
        }
      }
    }
  }

}