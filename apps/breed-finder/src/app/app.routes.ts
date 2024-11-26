import { Route } from '@angular/router';
import { OverviewPageComponent } from './components/overview/overview.component';

export const appRoutes: Route[] = [
  { path: '', component: OverviewPageComponent },
  {
    path: 'breed/:name',
    loadComponent: () => import('./components/breed-details/breed-details.component').then(m => m.BreedDetailsComponent),
    title: 'Breed Details',
    data: { title: 'breed details' }
  },
];
