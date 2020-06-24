import { IsString, IsOptional, IsInt, IsNumber, MinLength, IsArray } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  poster?: string;

  @IsOptional()
  @IsInt()
  stock?: number;

  @IsOptional()
  @IsString()
  trailer?: string;

  @IsOptional()
  @IsNumber()
  salePrice?: number;

  @IsOptional()
  @IsNumber()
  rentPrice?: number;
}
