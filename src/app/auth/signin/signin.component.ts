import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '@app/shared/validators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    private authService: AuthService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private validationService: ValidationService

  ) { }

  ngOnInit(): void {
    this.bindForm();
  }

  private bindForm() {
    this.signinForm = this.formBuilder.group({
      email: [null, Validators.compose([
        Validators.required,
        Validators.pattern(this.validationService.regEmail),
      ])],
      password: [null, Validators.compose([
        Validators.required,
      ])],
    });
  }


  postLogin(search?) {
    this.authService.postLogin(this.signinForm.value).subscribe(
      data => {
        if (data.Status === 500) {
          this.toastrService.error(data.Message);
        } else {
          const token = 'Bearer ' + data.Data.Token;
          this.authenticationService.set('token', token);
          this.authenticationService.set('user', JSON.stringify(data.Data));
          this.router.navigate(['app', 'sensor']);
        }
      },
      error => {
        this.toastrService.error(error.error.errors.Email[0]);
      });
  }


  register(){
    this.router.navigate(['auth', 'register']);
  }



}
