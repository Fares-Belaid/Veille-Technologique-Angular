import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({

  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {

  formGroup: FormGroup;
  // form: any = {
  //   email: null,
  //   password: null
  // };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private tokenStorage: TokenStorageService, private router : Router) { }


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required])
    });
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
  //  const { username, password } = this.form;

    this.authService.login(this.formGroup.value.email,this.formGroup.value.password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/home']);      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
