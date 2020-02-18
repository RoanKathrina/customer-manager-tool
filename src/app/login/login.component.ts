import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import members from '../../json/members.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})

export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    // Check if Username has value
    // Check if Password has value
    // Check if Username is in members.json
    // Check if Password match the password of the Username
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    if(username === null) {
      window.alert('Error: Kindly input Username.');
      return;
    }

    if(password === null) {
      window.alert('Error: Kindly input Password.');
      return;
    }

    let memberFlg = members.members.find(item => item.username === username && item.password === password);
    
    if(memberFlg === undefined ) {
      window.alert('Error: User is not found in the Customer Manager Tool Database.');
      return;
    }
    else {
      this.loginForm.reset();
      this.router.navigate(['../customer-page'], {relativeTo: this.route})
    }
  }

  goToSignUpPage() {
    this.router.navigate(['../signup'], {relativeTo: this.route});
  }
}
