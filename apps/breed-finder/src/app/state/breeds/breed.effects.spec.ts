import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { BreedEffects } from './breed.effects';
import { BreedService } from '../../services/breed/breed.service';
import { getBreedList, getBreedListFailure, getBreedListSuccess } from './breed.actions';

describe('CourseProgressEffects', () => {
  let actions: Observable<unknown>;
  let effects: BreedEffects;
  let service: BreedService;
  let store: MockStore;

  const mockBreedList = ['Pomeranian', 'Poodle'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BreedEffects,
        provideMockStore(),
        provideMockActions(() => actions),
        {
          provide: BreedService,
          useValue: {
            getBreedList: jest.fn()
          }
        }
      ]
    });

    service = TestBed.inject(BreedService);
    effects = TestBed.inject(BreedEffects);
    store = TestBed.inject(MockStore);

    jest.spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('getBreedList$', () => {
    describe('when the service returns successful', () => {
      it('should dispatch getBreedListSuccess', () => {
        actions = hot('-a', { a: getBreedList() });

        const serviceResponse = cold('-a', { a: mockBreedList });
        service.getBreedList = jest.fn(() => serviceResponse);

        const expected = cold('--a', { a: getBreedListSuccess({ breeds: mockBreedList }) });

        expect(effects.getBreedList$).toBeObservable(expected);
        expect(service.getBreedList).toHaveBeenCalled();
      });
    });

    describe('when the service returns an error', () => {
      it('should dispatch getBreedListFailure', () => {
        const error = new Error('oops');

        actions = hot('-a', { a: getBreedList() });

        const serviceResponse = cold('-#|', {}, error);
        service.getBreedList = jest.fn(() => serviceResponse);

        const expected = cold('--a', { a: getBreedListFailure({error}) });

        expect(effects.getBreedList$).toBeObservable(expected);
        expect(service.getBreedList).toHaveBeenCalled();
      });
    });
  });
});
