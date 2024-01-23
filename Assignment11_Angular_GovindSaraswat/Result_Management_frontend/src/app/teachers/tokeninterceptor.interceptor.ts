import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import {ApiserviceService} from '../teachers/apiservice.service';

@Injectable()
export class TokeninterceptorInterceptor implements HttpInterceptor {

  constructor(private service:ApiserviceService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let getToken = this.service.getToken();
    
    if(getToken) {
      request = request.clone({
        setHeaders:{
          token:`${getToken}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err)=>{
        if(err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.log ('error');
          }
        }
        return throwError(err);
      })
    )
    
    //return next.handle(setheadertoken);
  }
}
