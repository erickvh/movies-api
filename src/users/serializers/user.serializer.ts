import { Exclude } from 'class-transformer';
import { Rol } from 'src/auth/entities/roles.entity';

export class UserSerializer {
  id: number;
  username: string;
  @Exclude()
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  rol: Rol;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserSerializer>) {
    Object.assign(this, partial);
  }
}
