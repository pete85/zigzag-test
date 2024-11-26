import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BreedState } from '../../interfaces/breed.model';

export const selectBreedState = createFeatureSelector<BreedState>('breedState');

export const selectBreedList = createSelector(
  selectBreedState,
  (state: BreedState) => state.breedList
);

export const selectBreedDetails = createSelector(
  selectBreedState,
  (state: BreedState) => state.breedDetails
);

export const selectBreedError = createSelector(
  selectBreedState,
  (state) => state.error
);

