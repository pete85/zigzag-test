import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { BreedEffects } from './state/breeds/breed.effects';
import { breedReducer } from './state/breeds/breed.reducer';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideStore(),
    provideStoreDevtools(),
    provideState(breedReducer),
    provideEffects([BreedEffects]),
    provideHttpClient()
  ]
};
