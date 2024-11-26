import { Injectable } from '@angular/core';
import { BreedService } from './breed.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getBreedList, getBreedListFailure, getBreedListSuccess } from './breed.actions';
import { catchError, concatMap, map, of } from 'rxjs';

@Injectable()
export class BreedEffects {
  constructor(
    private actions$: Actions,
    private breedService: BreedService,
  ) {}

  getBreedList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getBreedList),
      concatMap(() => {
          return this.breedService.getBreedList().pipe(
            map((breeds) =>
              getBreedListSuccess({ breeds }),
            ),
            catchError((e) => of(getBreedListFailure({ error: e }))),
          )
        }
      ),
    );
  });
}
