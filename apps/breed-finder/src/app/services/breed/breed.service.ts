import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Breed } from '../../interfaces/breed.model';

@Injectable({
  providedIn: 'root',
})
export class BreedService {
  constructor(private http: HttpClient) {}

  public getBreedList(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:3000/api/breed')
  }

  public getBreedDetails(breedName: string): Observable<Breed[]> {
    let params = new HttpParams();

    if (breedName) {
      params = params.set('name', breedName);
    }

    return this.http.get<Breed[]>(`http://localhost:3000/api/breed/details`, {params: params})
  }
}
