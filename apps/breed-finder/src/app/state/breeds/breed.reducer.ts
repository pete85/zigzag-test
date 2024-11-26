import { createFeature, createReducer, on } from '@ngrx/store';
import { BreedState } from '../../interfaces/breed.model';
import {
  getBreedListSuccess,
  selectBreed,
  getBreedDetailsSuccess,
  getBreedDetailsFailure,
} from './breed.actions';

export const initialState: BreedState = {
  breedList: [],
  selectedBreed: null,
  breedDetails: null,
  error: null
};

export const breedReducer = createFeature({
  name: 'breedState',
  reducer: createReducer(
    initialState,
    on(getBreedListSuccess, (state, { breeds }) => {
      return {
        ...state,
        breedList: breeds,
        error: null
      };
    }),
    on(selectBreed, (state, { selectedBreed }) => ({
      ...state,
      selectedBreed,
    })),
    on(getBreedDetailsSuccess, (state, { breed }) => ({
      ...state,
      breedDetails: breed,
      error: null
    })),
    on(getBreedDetailsFailure, (state, { error }) => ({
      ...state,
      error: error.message,
      breedDetails: null
    }))
  ),
});
