import { Injectable } from '@nestjs/common';
import { Breed } from './breed.model';
import breedList from '../assets/breed-list.json';

@Injectable()
export class BreedService {
  getAllBreeds(): string[] {
    const breedInfos: Breed[] = JSON.parse(JSON.stringify(breedList))
    return breedInfos.map((breedInfo) => breedInfo.name)
  }

  /**
   * Get a dog breed by name - partial or full
   * @param breedName
   */
  getBreedByName(breedName: string): Breed[] {
    const breedInfos: Breed[] = JSON.parse(JSON.stringify(breedList));

    return breedInfos.filter((breedInfo) =>
      breedInfo.name.toLowerCase().includes(breedName.toLowerCase())
    );
  }
}
