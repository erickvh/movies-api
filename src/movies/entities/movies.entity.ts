import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  Check,
} from 'typeorm';
import { Tag } from 'src/tags/entities/tags.entity';

@Entity()
@Check(`"stock" >= 0`)
@Check(`"salePrice" >= 0`)
@Check(`"rentPrice" >= 0`)
@Check(`"likes" >= 0`)
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(
    () => Tag,
    tag => tag.name,
    {
      eager: true,
    },
  )
  @JoinTable()
  tags: Tag[];

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  poster: string;

  @Column({ type: 'int' })
  stock: number;

  @Column({ nullable: true })
  trailer: string;

  @Column()
  salePrice: number;

  @Column()
  rentPrice: number;

  @Column({ type: 'int', default: 0 })
  likes: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
