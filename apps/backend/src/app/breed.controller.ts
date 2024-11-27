import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BreedService } from './breed.service';
import { Breed } from './breed.model';

@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  // I kept this for reference
  // @Get()
  // getBreeds(): string[] {
  //   return this.breedService.getAllBreeds();
  // }

  /**
   * Updated get breeds with an option to add a name (can be partial)
   * @param name
   */
  @Get()
  getBreeds(@Query('name') name?: string): string[] | Breed[] {
    if (name) {
      return this.breedService.getBreedByName(name);
    }
    return this.breedService.getAllBreeds();
  }

  /**
   * Get breed details by breed name provided. This returns an array as multiple results might be returned for given name
   * @param name
   */
  @Get('details')
  @UsePipes(new ValidationPipe({ transform: true }))
  getBreedDetails(@Query('name') name: string): Breed[] {
    return this.breedService.getBreedByName(name);
  }
}
