import { Controller, Get } from '@nestjs/common';

import { BreedService } from './breed.service';

@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Get()
  getBreeds(): string[] {
    return this.breedService.getAllBreeds();
  }
}
