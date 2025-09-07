import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

class Rating {
  @Column('float')
  stars: number;

  @Column('int')
  count: number;
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column(() => Rating)
  rating: Rating;

  @Column('int')
  priceCents: number;

  @Column('text', { array: true })
  keywords: string[];
}
