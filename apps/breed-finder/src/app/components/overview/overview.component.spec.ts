import { TestBed } from '@angular/core/testing';
import { OverviewPageComponent } from './overview.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { getBreedList, selectBreed } from '../../state/breeds/breed.actions';

describe('OverviewPageComponent', () => {
  let component: OverviewPageComponent;
  let store: MockStore;
  let router: Router;
  let dispatchSpy: jest.SpyInstance;
  let navigateSpy: jest.SpyInstance;

  const mockBreedList = [
    'Labrador Retriever',
    'German Shepherd',
    'Golden Retriever',
  ];

  const initialState = {
    breedState: {
      breedList: mockBreedList,
      selectedBreed: null,
      breedDetails: null,
      error: null,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewPageComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    dispatchSpy = jest.spyOn(store, 'dispatch');
    navigateSpy = jest.spyOn(router, 'navigate');
    component = TestBed.createComponent(
      OverviewPageComponent
    ).componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getBreedList on ngOnInit', () => {
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(getBreedList());
  });

  it('should select breedList$ from the store', (done) => {
    component.breedList$.subscribe((breedList) => {
      expect(breedList).toEqual(mockBreedList);
      done();
    });
  });

  describe('selectBreed()', () => {
    it('should dispatch selectBreed action with the selected breed', () => {
      component.selectBreed(mockBreedList[0]);
      expect(dispatchSpy).toHaveBeenCalledWith(
        selectBreed({ selectedBreed: mockBreedList[0] })
      );
    });

    it('should navigate to the breed details page', () => {
      component.selectBreed(mockBreedList[0]);
      expect(navigateSpy).toHaveBeenCalledWith(['/breed', mockBreedList[0]]);
    });
  });
});
