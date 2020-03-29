import { TestBed } from '@angular/core/testing';
import { CachingInterceptorService } from './caching-interceptor.service';
import { RequestCacheService } from './request-cache.service';

describe('CachingInterceptorService', () => {
  let service: CachingInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            RequestCacheService,
            CachingInterceptorService
        ]
    });
    service = TestBed.inject(CachingInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
