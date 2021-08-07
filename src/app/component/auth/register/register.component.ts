import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  errorMessage: any;
  registerForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: Router,
    private matSnakeBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  register() {
    this.spinner.show();
    this.auth.signUp(this.registerForm.value).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handleError(error)
    );
  }

  handleResponse(data: void) {
    this.spinner.hide();
    this.route.navigateByUrl('/login');
    this.matSnakeBar.open('Sucessfull Registration Done ', 'ok', {
      duration: 5000,
    });
  }
  handleError(error: any) {
    this.errorMessage = error.message;
    this.spinner.hide();
    this.matSnakeBar.open(error.message, 'ok', {
      duration: 5000,
    });
  }
}
