import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Check, ManyToOne } from 'typeorm';
import { IsInt, IsPositive } from 'class-validator';
import { Order } from './orders.entity';
import { Movie } from 'src/movies/entities/movies.entity';

@Entity()
@Check(`"unitPrice" >= 0`)
@Check(`"subTotal" >= 0`)
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Order,
    order => order.orderDetails,
    { nullable: false },
  )
  order: Order;

  @ManyToOne(
    () => Movie,
    movie => movie.orderDetails,
    {
      eager: true,
      nullable: false,
    },
  )
  movie: Movie;

  @Column()
  @IsInt()
  @IsPositive()
  quantity: number;

  @Column()
  unitPrice: number;

  @Column()
  subTotal: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
