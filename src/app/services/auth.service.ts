import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';

@Injectable()
export class AuthService{
  
    private baseUrl : String = "http://localhost:8080/api"; 
    constructor(private http : HttpClient){}

    //register user
    postUserDetails(formData){
        const header = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'PUT, DELETE,GET'
        });
        return this.http.post(this.baseUrl+'/user/register',formData,{headers: header});
    }

    //user verification method
    authenticateUser(username, password){
        const header = new HttpHeaders({
            'Content-Type':'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin':'*'
          });

       return this.http.post(this.baseUrl+'/user/authentication',{username, password});
    }

    //get user details
    getUserDetails(username, authtoken){
        const header = new HttpHeaders({
            'Content-Type':'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin':'*'
          });
        return this.http.get(this.baseUrl+'/user',{params: {
             'username':username,
             'authtoken': authtoken
            }
        });
    }

    //upload image into localhost
    uploadImage(selectedFile){
        return this.http.post('/assets/images/'+selectedFile.name, selectedFile);
    }

    //Add New Product
    addProduct(req){
        return this.http.post(this.baseUrl+"/product",req);
    }

    //update product
    getAllProduct(){
        return this.http.get(this.baseUrl+"/product");
    }

    //GetProduct By Id
    getProductById(id){
        return this.http.get(this.baseUrl+"/product/"+id);
    }

    //Update Product By Id
    updateProduct(id,reqdata){
        return this.http.put(this.baseUrl+"/product/"+id, reqdata);
    }

    deleteProjectById(id,authtoken){
        const header = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'PUT, DELETE,GET',
            'id' : id,
            'authtoken': authtoken
        });
        return this.http.delete(this.baseUrl+"/product/"+id, {headers: header});
    }

    activeProjectById(id,authtoken){
        const header = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'PUT, DELETE,GET'
        });
        return this.http.put(this.baseUrl+"/product/activeproduct", {
            params: {
                'id' : id,
                'authtoken': authtoken
            }
        });
    }
}