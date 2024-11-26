import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Breed } from './breed.model';
import breedList from '../assets/breed-list.json';

@Injectable()
export class BreedService {

  private readonly _logger = new Logger(BreedService.name);

  getAllBreeds(): string[] {
    return breedList.map((breedInfo: Breed) => breedInfo.name);
  }

  /**
   * Get a dog breed by name - partial or full
   * @param breedName
   */
  getBreedByName(breedName: string): Breed[] {
    const breedInfos: Breed[] = JSON.parse(JSON.stringify(breedList));

    const matchingBreeds = breedInfos.filter((breedInfo) =>
      breedInfo.name.toLowerCase().includes(breedName.toLowerCase()),
    );

    if (matchingBreeds.length === 0) {
      this._logger.warn(`No breeds found matching name: ${breedName}`);
      throw new NotFoundException(`No breeds found matching name: ${breedName}`);
    }

    return matchingBreeds;
  }

}
