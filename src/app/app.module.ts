import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ProductComponent } from './product/product.component';
import { AddproductComponent } from './product/addproduct.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SearchComponent } from './search/search.component';
import { ProductFilterPipe } from './product/product-filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EmailVerificationComponent,
    ProductComponent,
    AddproductComponent,
    SearchComponent,
    ProductFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [ 
    AuthService ,
    CookieService,
    ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
