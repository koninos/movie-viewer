import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesService } from '../movies.service';
import { MoviesContainerComponent } from './movies-container.component';

describe('MoviesContainerComponent', () => {
  let component: MoviesContainerComponent;
  let fixture: ComponentFixture<MoviesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpClientModule
        ],
        declarations: [ MoviesContainerComponent ],
        providers: [
            MoviesService,
            { provide: 'API_KEY', useValue: '9198fa6d9a9713bc6b03ee9582525917' }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
