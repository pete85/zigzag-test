import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { getBreedList } from '../state/breeds/breed.actions';
import { breedReducer } from '../state/breeds/breed.reducer';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [AsyncPipe],
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['overview.page.scss']
})
export class OverviewPageComponent implements OnInit {
  breedList$: Observable<string[]> = this.store.select(breedReducer.selectBreedList);

  constructor(private store: Store) {}

  ngOnInit(){
    this.store.dispatch(getBreedList())
  }
}
