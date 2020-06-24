import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePaswordDto {
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  constructor(password: string) {
    this.password = password;
  }
}
