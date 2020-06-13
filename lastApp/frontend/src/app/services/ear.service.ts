import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class EarService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService
  ) { }


  path = environment.path;


  getSecretKey(nonce: string): Observable<number> {
    const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json'
    })
   };
    return this.httpClient.post<number>(this.path + 'getSecretKey', { 'nonce' : nonce}, httpOptions).pipe(
         tap(data => this.alertifyService.success(data.toString())),
         catchError(this.handleError)
       );
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
