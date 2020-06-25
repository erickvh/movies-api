import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Check,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/entities/users.entity';
import { OrderDetail } from './order-details.entity';

@Entity()
@Check(`"total" >= 0`)
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => OrderDetail,
    orderDetail => orderDetail.order,
  )
  orderDetails: OrderDetail[];

  @ManyToOne(
    () => User,
    user => user.orders,
    { nullable: false },
  )
  user: User;

  @Column()
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
