import { TestBed } from '@angular/core/testing';
import { BreedService } from './breed.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Breed } from '../../interfaces/breed.model';

describe('BreedService', () => {
  let service: BreedService;
  let httpMock: HttpTestingController;

  // let httpClient: HttpClient;
  // Manual mocking HttpClient is redundant because HttpTestingController is specifically designed to test HTTP requests
  // with the real HttpClientTestingModule.

  const mockBreedList = ['Pomeranian', 'Poodle'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BreedService],
    });

    service = TestBed.inject(BreedService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBreedList()', () => {
    it('should retrieve the list of breeds', () => {
      service.getBreedList().subscribe((breeds) => {
        expect(breeds).toEqual(mockBreedList);
      });

      const req = httpMock.expectOne('http://localhost:3000/api/breed');
      expect(req.request.method).toBe('GET');
      req.flush(mockBreedList);
    });
  });

  describe('getBreedDetails', () => {
    const mockBreedDetails: Breed[] = [
      {
        name: 'Golden Retriever',
        description: 'Friendly and intelligent',
        size: 'Medium to Large',
        origin: 'Scotland',
        lifeExpectancy: '10-12 years',
        temperament: ['Friendly', 'Intelligent', 'Devoted'],
        image: 'https://example.com/golden-retriever.jpg',
      },
    ];

    it('should retrieve breed details by name', () => {
      service.getBreedDetails('Golden Retriever').subscribe((breedDetails) => {
        expect(breedDetails).toEqual(mockBreedDetails);
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === 'http://localhost:3000/api/breed/details' &&
          request.params.has('name')
      );

      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('name')).toBe('Golden Retriever');
      req.flush(mockBreedDetails);
    });

    it('should handle errors when retrieving breed details', () => {
      const errorMessage = 'Failed to fetch breed details';

      service.getBreedDetails('Golden Retriever').subscribe({
        next: () => fail('Expected an error, not breed details'),
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Not Found');
        },
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === 'http://localhost:3000/api/breed/details' &&
          request.params.has('name')
      );

      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });
  });
});
