import { createFeature, createReducer, on } from '@ngrx/store';
import { BreedState } from '../../interfaces/breed.model';
import { getBreedListSuccess, selectBreed } from './breed.actions';

export const initialState: BreedState = {
  breedList: [],
  selectedBreed: null
};

export const breedReducer = createFeature({
  name: 'breedState',
  reducer: createReducer(
    initialState,
    on(getBreedListSuccess, (state, {breeds}) => {
      return {
        ...state,
        breedList: breeds
      }
    }),
    on(selectBreed, (state, { selectedBreed }) => ({
      ...state,
      selectedBreed
    }))
  )
});
