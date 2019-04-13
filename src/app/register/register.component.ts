import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userRegisterationForm : FormGroup;
  isPasswordEqual : boolean;
  doNotMatch : boolean;
  message : string;
  isRegistrationFailed : boolean = false;

  constructor(private fb : FormBuilder,
              private Auth : AuthService,
              private route : Router,
              private location : Location) { }

  ngOnInit() {

    this.userRegisterationForm = this.fb.group({
          firstname: [null, [Validators.required,Validators.pattern('[a-zA-Z]+')]],
          lastname: [null, [Validators.required,Validators.pattern('[a-zA-Z]+')]],
          emailid: [null, [Validators.required,Validators.email]],
          password: [null, [Validators.required,Validators.minLength(8)]],
          cnfpass: [null, [Validators.required]]
      });
  }

  checkPassword(){
      let password = this.userRegisterationForm.controls['password'].value;
      let repeatPassword = this.userRegisterationForm.controls['cnfpass'].value;
      if (repeatPassword !== password) {
        this.doNotMatch = false;
      }else{
        this.doNotMatch = true;
      }
  }

  save(): void{
    const formData = new FormData();
    const md5 = new Md5();
    var pass = md5.appendStr(this.userRegisterationForm.value.password).end();
    formData.append('firstName',this.userRegisterationForm.value.firstname);
    formData.append('lastName',this.userRegisterationForm.value.lastname);
    formData.append('emailId',this.userRegisterationForm.value.emailid);
    formData.append('password',""+pass);
    this.Auth.postUserDetails(formData).subscribe(
      data =>{
        if(data['success']='true'){
          this.location.replaceState('/');
          this.route.navigate(['login']);
        }else{
          this.isRegistrationFailed = true;
          this.message = data['message'];
        }
    },
    error =>{
        this.message = "Sorry For This We Will Get Back To You Soon";
    });
  }
}
