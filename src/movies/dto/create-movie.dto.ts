import { IsString, IsNotEmpty, IsOptional, IsInt, IsNumber, MinLength, IsArray } from 'class-validator';

export class CreateMovieDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  tags?: string[];

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  poster?: string;

  @IsNotEmpty()
  @IsInt()
  stock: number;

  @IsOptional()
  @IsString()
  trailer?: string;

  @IsNotEmpty()
  @IsNumber()
  salePrice: number;

  @IsNotEmpty()
  @IsNumber()
  rentPrice: number;
}
