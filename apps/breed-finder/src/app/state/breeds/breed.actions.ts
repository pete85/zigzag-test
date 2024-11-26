import { createAction, props } from '@ngrx/store';
import { Breed } from '../../interfaces/breed.model';

export enum ActionTypes {
  GET_BREED_LIST = '[Breed] Get Breed List',
  GET_BREED_LIST_SUCCESS = '[Breed] Get Breed List Success',
  GET_BREED_LIST_FAILURE = '[Breed] Get Breed List Failure',
  SELECT_BREED = '[Breed] Select Breed',
  GET_BREED_DETAILS = '[Breed] Get Breed Details',
  GET_BREED_DETAILS_SUCCESS = '[Breed] Get Breed Details Success',
  GET_BREED_DETAILS_FAILURE = '[Breed] Get Breed Details Failure',
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

export const getBreedDetails = createAction(
  ActionTypes.GET_BREED_DETAILS,
  props<{ selectedBreed: string }>()
);

export const getBreedDetailsSuccess = createAction(
  ActionTypes.GET_BREED_DETAILS_SUCCESS,
  props<{ breed: Breed[] }>(),
);

export const getBreedDetailsFailure = createAction(
  ActionTypes.GET_BREED_DETAILS_FAILURE,
  props<{ error: Error }>()
);
