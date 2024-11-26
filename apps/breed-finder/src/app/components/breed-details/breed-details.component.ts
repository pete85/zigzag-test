import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Breed } from '../../interfaces/breed.model';
import { ActivatedRoute } from '@angular/router';
import { getBreedDetails } from '../../state/breeds/breed.actions';
import { selectBreedDetails } from '../../state/breeds/breed.selectors';

@Component({
  selector: 'app-breed-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breed-details.component.html',
  styleUrls: ['./breed-details.component.scss'],
})
export class BreedDetailsComponent implements OnInit {
  private _store = inject(Store);
  private _route = inject(ActivatedRoute);

  breedDetails$: Observable<Breed[] | null> = this._store.select(selectBreedDetails);

  ngOnInit() {
    const selectedBreedName = this._route.snapshot.paramMap.get('name') ?? '';

    if (selectedBreedName) {
      this._store.dispatch(getBreedDetails({ selectedBreed: selectedBreedName }));
    }
  }
}
