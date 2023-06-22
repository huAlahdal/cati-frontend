import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(
    req: import('@angular/common/http').HttpRequest<any>,
    next: import('@angular/common/http').HttpHandler
    ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
      return next.handle(req).pipe(
        catchError(error => {
          if (error.status === 401) {
            this.handleAuthError();
            return throwError('Unauthorized');
          }
          if (error instanceof HttpErrorResponse) {
            const applicationError = error.headers.get('Application-Error');
            if (applicationError) {
              return throwError(applicationError);
            }
            const serverError = error.error;
            let modalStateErrors = '';
            if (serverError.errors && typeof serverError.errors === 'object') {
              for (const key in serverError.errors) {
                if (serverError.errors[key]) {
                  modalStateErrors += serverError.errors[key] + '\n';
                }
              }
            }
            return throwError(modalStateErrors || serverError || 'Server Error');
          }
        })
      );
  }

  private handleAuthError() {
    const userDataAgent = localStorage.getItem('userDataAgent');
    if (userDataAgent) {
      localStorage.removeItem('userDataAgent');
      localStorage.removeItem('project');
      }
    this.router.navigate(['/']);
  }

}


export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptorService,
  multi: true
};
