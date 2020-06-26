import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Order } from 'src/orders/entities/orders.entity';
import { Rol } from 'src/auth/entities/roles.entity';
import { Token } from 'src/auth/entities/tokens.entity';
import { Rent } from 'src/rents/entities/rents.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @OneToMany(
    () => Token,
    token => token.user,
  )
  tokens: Token[];

  @ManyToOne(
    () => Rol,
    rol => rol.users,
    { nullable: false },
  )
  rol: Rol;

  @OneToMany(
    () => Order,
    order => order.user,
  )
  orders: Order[];

  @OneToMany(
    () => Rent,
    rent => rent.user,
  )
  rents: Rent[];

  @Column({ length: 128, unique: true })
  username: string;

  @Column({ length: 60 })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ length: 128, unique: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
