import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ProductComponent } from './product/product.component';
import { AddproductComponent } from './product/addproduct.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'emailVerification', component: EmailVerificationComponent },
    { path: 'product', component: ProductComponent },
    { path: 'addproduct', component: AddproductComponent},
    { path: 'addproduct/:id', component: AddproductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
