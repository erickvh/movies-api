import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Order } from 'src/orders/entities/orders.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @OneToMany(
    () => Order,
    order => order.user,
  )
  orders: Order[];

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
