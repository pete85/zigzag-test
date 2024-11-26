import { TestBed } from '@angular/core/testing';
import { BreedService } from './breed.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('CapacitorListenersService', () => {
  let service: BreedService;
  let httpClient: HttpClient;

  const mockBreedList = ['Pomeranian', 'Poodle']

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BreedService,
        {
          provide: HttpClient,
          useValue: {
            get: jest.fn().mockReturnValue(mockBreedList)
          }
        }
      ],
    });

    service = TestBed.inject(BreedService);
    httpClient = TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBreedList', () => {
    it('should call http get', () => {
      expect(service.getBreedList()).toEqual(mockBreedList);

      expect(httpClient.get).toHaveBeenCalledWith('http://localhost:3000/api/breed')
    })
  })
});
