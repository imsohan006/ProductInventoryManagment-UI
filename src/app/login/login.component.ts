import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  userLoginForm: FormGroup;
  isLoginFailed : boolean = false;
  constructor(private fb : FormBuilder,
              private Auth : AuthService,
              private cookie : CookieService,
              private router : Router,
              private location : Location) { }

  ngOnInit() {
    
    if(this.cookie.check('authtoken') && this.cookie.get('authtoken') !== null){
      this.router.navigate(['product']);
    }

    this.userLoginForm = this.fb.group({
          emailid : [null,[Validators.required,Validators.email]],
          password : [null,[Validators.required]]
    });
  }

  signIN(): void{
    
      const username = this.userLoginForm.value.emailid;
      var password = this.userLoginForm.value.password;
      const md5 = new Md5();
      password = md5.appendStr(password).end();

      this.Auth.authenticateUser(username, password).subscribe(data => {
          if(data['success'] == true){
              this.cookie.set('username',data['username']);
              this.cookie.set('authtoken',data['authToken']);
              this.location.replaceState("/");
              this.router.navigate(['product']);
          } else{
             this.isLoginFailed = true;
          }
        },
        error => console.log(error)
      );
  }
}
