import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private nbToastrService: NbToastrService,
              private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.error.hasOwnProperty('auth') && !err.error.auth) {
          let message = 'Votre compte a été supprimé ou votre session est corrompue.';
          if (err.status === 401) {
            if (err.error.code === 'credentials_required') {
              message = 'Une connexion est nécessaire pour accéder à cette fonctionnalité.';
            } else {
              message = 'Votre session a expiré, veuillez vous reconnecter.';
            }
          }
          this.authService.logout();
          this.authService.checkLogging(message);
        }
        return throwError(err);
      })
    );
  }
}
