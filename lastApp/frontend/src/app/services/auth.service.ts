import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { LoginUser } from '../models/loginUser';
import { RegisterUser } from '../models/registerUser';
import { Observable, throwError } from 'rxjs';
import {map, tap, catchError } from 'rxjs/operators';
import { GetUserFormat } from '../models/getUserFormat';

export const AUTHENTICATED_USER = 'authenticatedUser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService
  ) { }


  path = 'http://127.0.0.1:5000/';
  userToken: any;
  TOKEN_KEY = 'token';


  register(dataa: RegisterUser): Observable<RegisterUser> {
    const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json'
    })
   };
    return this.httpClient.post<RegisterUser>(this.path + 'userSave', dataa, httpOptions).pipe(
         tap(data => this.alertifyService.success(data.toString())),
         catchError(this.handleError)
       );
     }



  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient
      .post(this.path + 'login', loginUser, { headers })
      .subscribe(data => {
        this.saveToken(data['token']);
        sessionStorage.setItem(AUTHENTICATED_USER, loginUser.email);
        this.userToken = data['token'];
        this.alertifyService.success('Sisteme giriş yapıldı');
        this.router.navigateByUrl('/profile');
      },
      (error) => {
        this.alertifyService.error('Hatalı kullanıcı adı veya şifre');
      }
      );
  }

  getUserInfo(email: string): Observable<GetUserFormat>  {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'
     })
    };
    return this.httpClient.post<GetUserFormat>(this.path + 'getUser', {'email': email}, httpOptions).pipe(
          tap(data => {}),
          catchError(this.handleError)
        );
      }


  saveToken(token) {

    localStorage.setItem(this.TOKEN_KEY, token);
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.alertifyService.error('Sistemden çıkış yapıldı');
  }



  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

    getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(this.TOKEN_KEY);
    }
  }


  isUserLoggedIn() {

    const user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }


  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
   errorMessage = 'bir hata oluştu' + err.error.message;
   } else {
     errorMessage = 'sistemsel bir hata';
   }

    return throwError (errorMessage);
  }

}
