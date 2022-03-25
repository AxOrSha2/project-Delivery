import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RegisterComponent } from './components/register/register.component';
import { StoreComponent } from './components/store/store.component';
import { PayComponent } from './components/pay/pay.component';
import { RegistrarProductosComponent } from './components/registrar-productos/registrar-productos.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: HomeComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'create-product', component: RegistrarProductosComponent},
  {path: 'alter-product/:id', component: RegistrarProductosComponent},
  {path: '', component: StoreComponent},
  {path: 'pay', component: PayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
