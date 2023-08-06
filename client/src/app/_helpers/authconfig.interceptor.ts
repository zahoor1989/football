import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { StorageService } from '../_services//storage.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.storageService.getToken();
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return next.handle(req);
  }
}
