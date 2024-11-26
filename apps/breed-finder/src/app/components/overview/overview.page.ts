import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { getBreedList } from '../../state/breeds/breed.actions';
import { breedReducer } from '../../state/breeds/breed.reducer';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Breed } from '../../../../../backend/src/app/breed.model';

@Component({
  standalone: true,
  imports: [AsyncPipe],
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['overview.page.scss']
})
export class OverviewPageComponent implements OnInit {
  breedList$: Observable<string[]> = this._store.select(breedReducer.selectBreedList);
  selectedBreed!: string;

  constructor(private _store: Store) {}

  ngOnInit(){
    this._store.dispatch(getBreedList())
  }

  selectBreed() {

  }
}
