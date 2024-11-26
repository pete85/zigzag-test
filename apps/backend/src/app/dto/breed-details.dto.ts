import {IsString, IsNotEmpty} from 'class-validator';

export class BreedDetailsDto {
  @IsString()
  @IsNotEmpty({ message: 'The "name" query parameter is required.' })
  name: string;
}
