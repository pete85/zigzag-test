import { TestBed } from '@angular/core/testing';
import { BreedDetailsComponent } from './breed-details.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { getBreedDetails } from '../../state/breeds/breed.actions';
import { selectBreedDetails, selectBreedError } from '../../state/breeds/breed.selectors';
import { Breed } from '../../interfaces/breed.model';

describe('BreedDetailsComponent', () => {
  let component: BreedDetailsComponent;
  let store: MockStore;
  let dispatchSpy: jest.SpyInstance;

  const mockBreedDetails: Breed[] = [
    {
      name: "Jack Russell Terrier",
      description: "Jack Russell Terriers description.",
      size: "Small",
      origin: "England",
      lifeExpectancy: "13-16 years",
      temperament: [
        "Energetic",
        "Fearless",
        "Alert",
        "Intelligent",
        "Independent"
      ],
      image: "https://test.com/images/jack-russell-terrier.jpg"
    }
  ];

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jest.fn(),
      },
    },
  };

  const initialState = {
    breedState: {
      breedDetails: null,
      error: null,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedDetailsComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = jest.spyOn(store, 'dispatch');
    component = TestBed.createComponent(BreedDetailsComponent).componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('getBreedDetails()', () => {
    it('should dispatch getBreedDetails action with the selected breed name on ngOnInit', () => {
      jest.spyOn(mockActivatedRoute.snapshot.paramMap, 'get').mockReturnValue(mockBreedDetails[0].name);
      component.getBreedDetails();

      expect(dispatchSpy).toHaveBeenCalledWith(
        getBreedDetails({ selectedBreed: mockBreedDetails[0].name }),
      );
    });

    it('should not dispatch getBreedDetails if no breed name is in the route', () => {
      jest.spyOn(mockActivatedRoute.snapshot.paramMap, 'get').mockReturnValue(null);
      component.getBreedDetails();

      expect(dispatchSpy).not.toHaveBeenCalled();
    });

    it('should select breedDetails$ from the store', (done) => {
      store.overrideSelector(selectBreedDetails, mockBreedDetails);

      component.breedDetails$.subscribe((details) => {
        expect(details).toEqual(mockBreedDetails);
        done();
      });
    });

    it('should select error$ from the store', (done) => {
      const mockError = 'An error occurred';
      store.overrideSelector(selectBreedError, mockError);

      component.error$.subscribe((error) => {
        expect(error).toEqual(mockError);
        done();
      });
    });
  });
});
