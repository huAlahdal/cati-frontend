import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CallsDataService } from '../services/callsData.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles: [
    `
  :host >>> .alert-md-local {
    background-color: #C42948;
    border-color: #00695C;
    color: #fff;
  }
  :host >>> .alert-md-local2 {
    background-color: #009372;
    border-color: #00695C;
    color: #fff;
  }
  `
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;

  constructor(private auth: AuthService, private route: Router, private httpRequest: CallsDataService,
              private spinner: NgxSpinnerService, private http: CallsDataService) {
    document.body.style.background = 'rgb(68, 68, 68)';
  }

  ngOnInit() {
    this.http.RemoveProjectId();
    this.loginForm = new FormGroup({
      mobile: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (!this.loginForm.valid) { return; }
    this.auth.agentLogin(this.loginForm.value).subscribe((resData) => {
      this.route.navigate(['/projects']);
      this.spinner.hide();
    },
    errorMessage => {
      this.error = errorMessage;
      this.spinner.hide();
    });
  }

}
