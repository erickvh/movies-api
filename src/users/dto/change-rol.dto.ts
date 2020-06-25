import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeRolDto {
  @IsNotEmpty()
  @IsString()
  readonly rol: string;
}
