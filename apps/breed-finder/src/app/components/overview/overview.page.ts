import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getBreedList, selectBreed } from '../../state/breeds/breed.actions';
import { breedReducer } from '../../state/breeds/breed.reducer';
import { AsyncPipe } from '@angular/common';
import { Observable, startWith } from 'rxjs';

@Component({
  standalone: true,
  imports: [AsyncPipe],
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['overview.page.scss'],
})
export class OverviewPageComponent implements OnInit {
  breedList$: Observable<string[]> = this._store
    .select(breedReducer.selectBreedList)
    .pipe(startWith([]));

  constructor(private _store: Store, private _router: Router) {}

  ngOnInit() {
    this._store.dispatch(getBreedList());
  }

  selectBreed(breed: string) {
    this._store.dispatch(selectBreed({ selectedBreed: breed }));
    this._router.navigate(['/breed', breed]);
  }
}
