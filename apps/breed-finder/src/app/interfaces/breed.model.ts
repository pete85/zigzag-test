export interface BreedState {
  breedList: string[],
  selectedBreed: string | null;
  breedDetails: Breed[] | null;
  error: string | null;
}

export interface Breed {
  name: string;
  description: string;
  size: string;
  origin: string;
  lifeExpectancy: string;
  temperament: string[];
  image: string;
}
