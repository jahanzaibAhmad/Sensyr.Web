import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { ValidationService } from '@app/shared/validators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

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
    this.registrationForm = this.formBuilder.group({
      username: [null, Validators.compose([
        Validators.required,
        Validators.pattern(this.validationService.regUserName)
      ])],
      firstName: [null, Validators.compose([
        Validators.required,
        Validators.pattern(this.validationService.regOnlyAlphabetic),
      ])],
      lastName: [null, Validators.compose([
        Validators.required,
        Validators.pattern(this.validationService.regOnlyAlphabetic),
      ])],
      phoneNumber: [null, Validators.compose([
        Validators.required,
        Validators.pattern(this.validationService.regPhoneNumber),
      ])],
      email: [null, Validators.compose([
        Validators.required,
        Validators.pattern(this.validationService.regEmail),
      ])],
      password: [null, Validators.compose([
        Validators.required,
        Validators.pattern(this.validationService.regPassword),
      ])],
      terms: [true,  Validators.compose([
        Validators.required,
        Validators.pattern('true')
      ])],
    });
  }


  register() {
    this.authService.register(this.registrationForm.value).subscribe(
      data => {
        if (data.Status === 500) {
          this.toastrService.error(data.Message);
        } else {
          // const token = 'Bearer ' + data.Data.Token;
          // this.authenticationService.set('token', token);
          // this.router.navigate(['app', 'sensor']);
          this.toastrService.success('User registered successfully!');
          this.login();
        }
      },
      error => {
        this.toastrService.error(error.error.errors.Email[0]);
      });
  }


  login() {
    this.router.navigate(['auth', 'login']);
  }

}
