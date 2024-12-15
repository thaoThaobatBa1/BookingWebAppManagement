import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink, } from '@angular/router';
export interface loginRegisterModel {
  email: string
  password: string
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private http: HttpClient ,private router : Router){}

  isLoginMode = true;

  loginRegisterInput: loginRegisterModel = {
    email: '',
    password: ''
  }

  urlLogin: string = 'https://localhost:7097/api/Auth/login'

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin() {
    this.http.post(this.urlLogin, this.loginRegisterInput).subscribe((res: any) => {
      if (res.token && res.token.result) {
        this.router.navigateByUrl('/layout/products');
        alert("Đăng nhập thành công");
  
        // Lưu token chính xác vào localStorage
        localStorage.setItem("token", res.token.result);
        localStorage.setItem("loginName", this.loginRegisterInput.email);
      } else {
        alert("Đăng nhập thất bại, vui lòng kiểm tra thông tin");
      }
    }, error => {
      console.error("Error during login:", error);
      alert("Đăng nhập thất bại, vui lòng kiểm tra thông tin");
    });
  }

  onRegister() {

  }
}
