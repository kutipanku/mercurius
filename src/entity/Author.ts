import {
  Entity,
  Column,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Quote } from './Quote';

@ObjectType()
@Entity('author')
export class Author extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Quote])
  @OneToMany(() => Quote, (quote: Quote) => quote.author)
  quote: Quote[];
}
