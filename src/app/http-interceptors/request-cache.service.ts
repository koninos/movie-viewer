import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

const maxAge = 300000; // 5 minutes

@Injectable()
export class RequestCacheService  {

  cache = new Map<string, CacheEntry>();

  get(req: HttpRequest<any>): HttpResponse<any> {
    const url = req.urlWithParams;
    const cached: CacheEntry = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - maxAge);

    return isExpired ? null : cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.url;
    const entry:CacheEntry = {
      url,
      response,
      lastRead: Date.now()
    };
    this.cache.set(url, entry);

    const expired = Date.now() - maxAge;
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }
}

interface CacheEntry {
  url: string;
  response: HttpResponse<any>;
  lastRead: number;
}