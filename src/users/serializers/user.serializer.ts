import { Exclude } from 'class-transformer';

export class UserSerializer {
  id: number;
  username: string;
  @Exclude()
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  @Exclude()
  isActive: boolean;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<UserSerializer>) {
    Object.assign(this, partial);
  }
}
