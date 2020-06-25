import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/users.entity';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => User,
    user => user.tokens,
    { nullable: false },
  )
  user: User;

  @Column({ unique: true })
  token: string;

  @CreateDateColumn()
  createdAt: Date;
}
