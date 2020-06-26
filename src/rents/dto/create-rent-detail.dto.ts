import { IsNotEmpty, IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateRentDetailDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  movieId: number;
}
