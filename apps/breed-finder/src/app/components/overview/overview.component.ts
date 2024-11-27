import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getBreedList, selectBreed } from '../../state/breeds/breed.actions';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { selectBreedList } from '../../state/breeds/breed.selectors';

@Component({
  standalone: true,
  imports: [AsyncPipe],
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['overview.component.scss'],
})
export class OverviewPageComponent implements OnInit {
  breedList$: Observable<string[]> = this._store.select(selectBreedList);

  constructor(private _store: Store, private _router: Router) {}

  ngOnInit() {
    this._store.dispatch(getBreedList());
  }

  selectBreed(breed: string) {
    this._store.dispatch(selectBreed({ selectedBreed: breed }));
    this._router.navigate(['/breed', breed]);
  }
}
