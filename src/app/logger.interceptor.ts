import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const excludedUrls = [
      '/Auth',
      '/register', // Añade aquí otras rutas que deseas excluir
    ];

    // Verifica si la URL actual debe ser excluida
    if (excludedUrls.some(url => req.url.includes(url))) {
      return next.handle(req);
    }

    let token = localStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('auth/login');
      return of();
    }

    let decodedToken;
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      localStorage.removeItem('token');
      this.router.navigateByUrl('auth/login');
      return of();
    }

    const isExpired =
      decodedToken && decodedToken.exp
        ? decodedToken.exp < Date.now() / 1000
        : true;

    if (isExpired) {
      localStorage.removeItem('token');
      this.router.navigateByUrl('auth/login');
      return of();
    }

    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(clonedReq);
  }
}
