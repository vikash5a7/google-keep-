import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  hide = true;
  errorMessage: any;
  constructor(
    private auth: AuthService,
    private route: Router,
    private matSnakeBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {}
  public form = {
    email: null,
    password: null,
  };
  ngOnInit() {}
  onSubmit() {
    this.spinner.show();
    this.auth.signIn(this.form).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handleError(error)
    );
  }
  handleResponse(data: void) {
    this.spinner.hide();
    this.route.navigateByUrl('/dashboard/notes');
    console.log(data);
    this.auth.setUserInfo(data);
    this.matSnakeBar.open('You logged in', 'ok', {
      duration: 5000,
    });
  }
  handleError(error: any) {
    this.errorMessage = error.message;
    if (error.code === 'auth/user-not-found') {
      this.errorMessage = 'User Not found';
    }
    this.spinner.hide();
    this.matSnakeBar.open(this.errorMessage, 'ok', {
      duration: 5000,
    });
  }
}
