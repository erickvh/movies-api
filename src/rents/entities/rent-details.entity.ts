import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Check, ManyToOne } from 'typeorm';
import { IsInt, IsPositive } from 'class-validator';
import { Rent } from './rents.entity';
import { Movie } from 'src/movies/entities/movies.entity';

@Entity()
@Check(`"unitPrice" >= 0`)
@Check(`"subTotal" >= 0`)
export class RentDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Rent,
    rent => rent.rentDetails,
    { nullable: false },
  )
  rent: Rent;

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
