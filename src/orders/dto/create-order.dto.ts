import { IsNotEmpty, ValidateNested, ArrayNotEmpty } from 'class-validator';
import { CreateOrderDetailDto } from './create-order-detail.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  orderDetails: CreateOrderDetailDto[];
}
