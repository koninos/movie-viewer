import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpClientModule
        ],
        providers: [
            MoviesService,
            { provide: 'API_KEY', useValue: '9198fa6d9a9713bc6b03ee9582525917' }
        ]
    });
    service = TestBed.inject(MoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
