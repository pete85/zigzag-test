import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Breed } from '../../interfaces/breed.model';
import { ActivatedRoute } from '@angular/router';
import { getBreedDetails } from '../../state/breeds/breed.actions';

@Component({
  selector: 'app-breed-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breed-details.component.html',
  styleUrl: './breed-details.component.scss',
})
export class BreedDetailsComponent implements OnInit, OnDestroy {
  private _store = inject(Store);
  private _route = inject(ActivatedRoute);

  breedDetails$: Observable<Breed[] | null> = this._store.select(
    (state) => state.breedState.breedDetails
  );

  breedData!: Breed;
  selectedBreedName!: string;
  subBreedData$!: Subscription;
  subscriptionList = new Subscription();

  ngOnInit() {
    this.selectedBreedName = this._route.snapshot.paramMap.get('name') ?? '';

    if (this.selectedBreedName) {
      this._store.dispatch(
        getBreedDetails({ selectedBreed: this.selectedBreedName })
      );
    }

    this.getBreedDetails();
  }

  getBreedDetails() {
    this.subBreedData$ = this.breedDetails$.subscribe({
      next: (response) => {
        this.subscriptionList.add(this.subBreedData$);
        if (response) {
          console.log(
            'BreedDetailsComponent received breed details:',
            response
          );
          this.breedData = response[0];
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnDestroy() {
    this.subscriptionList.unsubscribe();
  }
}
