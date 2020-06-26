import { IsNotEmpty, ValidateNested, ArrayNotEmpty, IsDateString } from 'class-validator';
import { CreateRentDetailDto } from './create-rent-detail.dto';
import { Type } from 'class-transformer';

export class CreateRentDto {
  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateRentDetailDto)
  rentDetails: CreateRentDetailDto[];

  @IsNotEmpty()
  @IsDateString()
  returnDate: Date;
}
