import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { SigninComponent } from './authentication/signin/signin.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'product', component: ProductComponent, canActivate: [AuthenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }