import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestCacheService } from './request-cache.service';

@Injectable()
export class CachingInterceptorService implements HttpInterceptor {

  constructor(private cache: RequestCacheService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cachedResponse = this.cache.get(req);
    return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next);
  }

  private sendRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.put(req, event);
        }
      })
    );
  }
}