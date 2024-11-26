import { Injectable } from '@angular/core';
import { BreedService } from '../../services/breed/breed.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getBreedDetails,
  getBreedDetailsFailure,
  getBreedDetailsSuccess,
  getBreedList,
  getBreedListFailure,
  getBreedListSuccess,
  selectBreed
} from './breed.actions';
import { catchError, concatMap, map, of } from 'rxjs';

@Injectable()
export class BreedEffects {
  constructor(
    private _actions$: Actions,
    private _breedService: BreedService,
  ) {}

  getBreedList$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(getBreedList),
      concatMap(() => {
          return this._breedService.getBreedList().pipe(
            map((breeds) => {
              console.log('Service returned breeds:', breeds);
              return getBreedListSuccess({ breeds });
            }),
            catchError((e) => of(getBreedListFailure({ error: e }))),
          )
        }
      ),
    );
  });


  // getBreedDetails$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(getBreedDetails),
  //     concatMap((action) => {
  //       return this._breedService.getBreedDetails(action.selectedBreed).pipe(
  //         map((breed) => {
  //           console.log('Service returned selected breed:', breed);
  //           return getBreedDetailsSuccess({ breed });
  //         }),
  //         catchError((e) => of(getBreedDetailsFailure({ error: e })))
  //       );
  //     }),
  //   );
  // });

  getBreedDetails$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(getBreedDetails),
      concatMap((action) => {
        return this._breedService.getBreedDetails(action.selectedBreed).pipe(
          map((breed) => {
            console.log('Service returned selected breed:', breed);
            return getBreedDetailsSuccess({ breed });
          }),
          catchError((e) => of(getBreedDetailsFailure({ error: e })))
        );
      }),
    );
  });

}
