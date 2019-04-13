import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

searchModel: string;
username : string;
authtoken : string;
products : any;
isSuperUser : boolean = true;
isProductActive : boolean = true;

@Output() public select: EventEmitter<{}> = new EventEmitter();

  constructor(private cookie : CookieService,
              private router : Router,
              private Auth : AuthService,
              private location : Location) { }

  ngOnInit() {

    if(!(this.cookie.check('authtoken'))){
      this.router.navigate(['login']);
    }

    this.username = this.cookie.get('username');
    this.authtoken = this.cookie.get('authtoken');
    if(this.authtoken.endsWith("@@Ad"))
      this.isSuperUser = false;
    this.getProducts();
  }

  editProduct(value){
      this.router.navigate(['addproduct/'+value.id]);
  }

  getProducts() : any{
    return this.Auth.getAllProduct().subscribe(data => {
        this.products = data;
      },
    error => console.log(error)
  );
  }

  deActiveProduct(product){
      var id = product['id'];
      this.Auth.deleteProjectById(id,this.authtoken).subscribe(
        data =>{
          if(data == "Product Deactivated..."){
            this.isProductActive = false;
            this.router.navigate(['product']);
          }
        }
      );
  }

  activeProduct(product){
    var id = product['id'];
      this.Auth.activeProjectById(id,this.authtoken).subscribe(
        data =>{
          if(data == "Product Deactivated..."){
            this.isProductActive = false;
            this.router.navigate(['product']);
          }
        }
      );
  }

  logout(){
    this.cookie.deleteAll();
    this.router.navigate(['login']);
  }

}
