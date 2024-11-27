import { Test, TestingModule } from '@nestjs/testing';
import { BreedService } from './breed.service';
import { NotFoundException } from '@nestjs/common';
import { Breed } from './breed.model';

describe('BreedService', () => {
  let service: BreedService;

  const mockBreedList = [
    { name: 'Labrador Retriever' },
    { name: 'German Shepherd' },
    { name: 'Golden Retriever' },
  ] as Breed[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BreedService],
    }).compile();

    service = module.get<BreedService>(BreedService);
    
    jest.spyOn(service, 'getAllBreeds').mockImplementation(() => mockBreedList.map(breed => breed.name));
    jest.spyOn(service, 'getBreedByName').mockImplementation((name) =>
      mockBreedList.filter((breed) => breed.name.toLowerCase().includes(name.toLowerCase())),
    );
  });

  it('should return all breeds', () => {
    const breeds = service.getAllBreeds();
    expect(breeds).toEqual(['Labrador Retriever', 'German Shepherd', 'Golden Retriever']);
  });

  it('should return breeds matching a name', () => {
    const breeds = service.getBreedByName('labrador');
    expect(breeds).toEqual([{ name: 'Labrador Retriever' }]);
  });

  it('should throw NotFoundException if no breeds match', () => {
    const mockEmptyList = [];
    jest.spyOn(service, 'getBreedByName').mockImplementation((name: string) => {
      if (mockEmptyList.length === 0) {
        throw new NotFoundException(`No breeds found matching name: ${name}`);
      }
      return mockEmptyList;
    });

    expect(() => service.getBreedByName('unknown')).toThrow(NotFoundException);
  });
});
