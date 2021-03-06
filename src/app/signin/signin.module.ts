import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin-component/signin.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SigninRoutingModule
  ]
})
export class SigninModule { }
