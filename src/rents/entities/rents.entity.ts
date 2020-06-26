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
import { RentDetail } from './rent-details.entity';

@Entity()
@Check(`"total" >= 0`)
export class Rent {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => RentDetail,
    rentDetail => rentDetail.rent,
  )
  rentDetails: RentDetail[];

  @ManyToOne(
    () => User,
    user => user.rents,
    { nullable: false },
  )
  user: User;

  @Column()
  total: number;

  @Column()
  returnDate: Date;

  @Column({ default: false })
  returned: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
