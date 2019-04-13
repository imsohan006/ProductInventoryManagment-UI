/*
@Author : Sohan Lal Yadav
*/

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, Event, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./product.component.css']
})
export class AddproductComponent implements OnInit {

  addProductForm : FormGroup;
  username : string;

  constructor(private fb: FormBuilder,
              private location: Location,
              private router: Router,
              private Auth : AuthService,
              private route: ActivatedRoute,
              private cookie : CookieService) { }

  ngOnInit() {
    
    if(!(this.cookie.check('authtoken'))){
      this.router.navigate(['login']);
    }
    this.username = this.cookie.get('username');

    this.addProductForm = this.fb.group({
        productname: [null,[Validators.required]],
        category: [null,[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        subcategory: [null,[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        quantity: [null,[Validators.required, Validators.pattern('^[0-9]{1,4}$')]],
        discount: [null,[Validators.required, Validators.pattern('^[0-9]+$')]],
        salefrom: [null,[Validators.required]],
        saleto: [null,[Validators.required]],
        price: [null,[Validators.required]],
        //image: [null,[Validators.required]]
    });

    if(this.route.params['value'].id !== undefined){
      this.Auth.getProductById(this.route.params['value'].id).subscribe(
        data=> {
          this.addProductForm.controls.productname.setValue(data['productName']);
          this.addProductForm.controls.category.setValue(data['productCategory']);
          this.addProductForm.controls.subcategory.setValue(data['productSubCategory']);
          this.addProductForm.controls.quantity.setValue(data['quantity']);
          this.addProductForm.controls.discount.setValue(data['discount']);
          this.addProductForm.controls['salefrom'].setValue(new Date(data['saleFrom']).toISOString().substring(0,10));
          this.addProductForm.controls.saleto.setValue(new Date(data['saleTo']).toISOString().substring(0,10));
          this.addProductForm.controls.price.setValue(data['price']);
          //this.addProductForm.controls.image.setValue(data['image']);
        });
    }
    
  }

  setTwoNumberDecimal($event) {
    $event.target.value = parseFloat($event.target.value).toFixed(2);
  }

  cancelConfirm(){
    if(confirm("Are You Sure About To Cancel")){
      this.location.replaceState('/');
      this.router.navigate(['product']);
    }
  }

  saveAndUpdate(){
    const reqdata = {};
    reqdata['productName'] = this.addProductForm.value.productname;
    reqdata['productCategory'] = this.addProductForm.value.category;
    reqdata['productSubCategory'] = this.addProductForm.value.subcategory;
    reqdata['quantity'] = this.addProductForm.value.quantity;  
    reqdata['discount'] = this.addProductForm.value.discount;
    reqdata['saleFrom'] = this.addProductForm.value.salefrom;   
    reqdata['saleTo'] = this.addProductForm.value.saleto;
    reqdata['price'] = this.addProductForm.value.price;
    reqdata['image'] = "prod.png";
    if(this.route.params['value'].id !== undefined){
      this.updateProduct(this.route.params['value'].id);
    }else{
      this.Auth.addProduct(reqdata).subscribe(
        data => { alert(data)},
        error=> alert(error)
      );
    }
  }

  
  updateProduct(id){
      const reqdata = {};
      reqdata['productName'] = this.addProductForm.value.productname;
      reqdata['productCategory'] = this.addProductForm.value.category;
      reqdata['productSubCategory'] = this.addProductForm.value.subcategory;
      reqdata['quantity'] = this.addProductForm.value.quantity;  
      reqdata['discount'] = this.addProductForm.value.discount;
      reqdata['saleFrom'] = this.addProductForm.value.salefrom;   
      reqdata['saleTo'] = this.addProductForm.value.saleto;
      reqdata['price'] = this.addProductForm.value.price;
      reqdata['image'] = "prod.png";
      this.Auth.updateProduct(id,reqdata).subscribe(
        data => alert("success"),
        error => alert(error['message'])
        );
  }

  logout(){
    this.cookie.deleteAll();
    this.router.navigate(['login']);
  }
}
