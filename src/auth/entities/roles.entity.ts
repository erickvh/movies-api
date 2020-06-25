import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/entities/users.entity';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => User,
    user => user.rol,
  )
  users: User[];

  @Column({ length: 128, unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
