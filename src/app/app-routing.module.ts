import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RegisterComponent } from './components/register/register.component';
import { StoreComponent } from './components/store/store.component';
import { PayComponent } from './components/pay/pay.component';
import { RegisterProductsComponent } from './components/register-products/register-products.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: HomeComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'create-product', component: RegisterProductsComponent},
  {path: 'alter-product/:id', component: RegisterProductsComponent},
  {path: '', component: StoreComponent},
  {path: 'pay', component: PayComponent},
  {path: 'landing', component: LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
