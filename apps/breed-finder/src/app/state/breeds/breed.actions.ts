import { createAction, props } from '@ngrx/store';

export enum ActionTypes {
  GET_BREED_LIST = '[Breed] Get Breed List',
  GET_BREED_LIST_SUCCESS = '[Breed] Get Breed List Success',
  GET_BREED_LIST_FAILURE = '[Breed] Get Breed List Failure',
  SELECT_BREED = '[Breed] Select Breed',
}

export const getBreedList = createAction(
  ActionTypes.GET_BREED_LIST
);

export const getBreedListSuccess = createAction(
  ActionTypes.GET_BREED_LIST_SUCCESS,
  props<{ breeds: string[] }>(),
);

export const getBreedListFailure = createAction(
  ActionTypes.GET_BREED_LIST_FAILURE,
  props<{ error: Error }>()
);

export const selectBreed = createAction(
  ActionTypes.SELECT_BREED,
  props<{ selectedBreed: string }>(),
);
