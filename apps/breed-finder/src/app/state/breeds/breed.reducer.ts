import { createFeature, createReducer, on } from '@ngrx/store';
import { BreedState } from './breed.model';
import { getBreedListSuccess } from './breed.actions';

export const initialState: BreedState = {
  breedList: []
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
    })
  )
});
