import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ length: 50 })
  slug: string;
}
