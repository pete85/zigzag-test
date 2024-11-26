import { createAction, props } from '@ngrx/store';

export const getBreedList = createAction('[Breed] Get Breed List');

export const getBreedListSuccess = createAction(
  '[Breed] Get Breed List Success',
  props<{ breeds: string[] }>(),
);

export const getBreedListFailure = createAction('[Breed] Get Breed List Failure', props<{ error: Error }>());
