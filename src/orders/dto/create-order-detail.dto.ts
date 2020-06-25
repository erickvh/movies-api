import { IsNotEmpty, IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDetailDto {
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
