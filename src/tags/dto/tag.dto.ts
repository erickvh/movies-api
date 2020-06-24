import { IsString, IsNotEmpty } from 'class-validator';

export class TagDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
