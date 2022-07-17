import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { ProductComponent } from './product/product.component';
import { ProductCardComponent } from './product/product-card/product-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductUpdateDialogComponent } from './product/product-update-dialog/product-update-dialog.component';
import { ConfirmDialogComponent } from './utils/confirm-dialog/confirm-dialog.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { UploadFileComponent } from './utils/upload-file/upload-file.component';
import { HomepageWelcomeComponent } from './homepage/homepage-welcome/homepage-welcome.component';
import { HomepageNewsComponent } from './homepage/homepage-news/homepage-news.component';
import { WelcomeCarouselComponent } from './homepage/homepage-welcome/welcome-carousel/welcome-carousel.component';
import { NewsCarouselComponent } from './homepage/homepage-news/news-carousel/news-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarMenuComponent,
    HomepageComponent,
    FooterComponent,
    AuthenticationComponent,
    SigninComponent,
    ProductComponent,
    ProductCardComponent,
    ProductUpdateDialogComponent,
    ConfirmDialogComponent,
    ProductCreateComponent,
    UploadFileComponent,
    HomepageWelcomeComponent,
    HomepageNewsComponent,
    WelcomeCarouselComponent,
    NewsCarouselComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
