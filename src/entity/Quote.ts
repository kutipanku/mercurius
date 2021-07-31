import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Author } from './Author';
import { Content } from './Content';

@ObjectType()
@Entity('quote')
export class Quote extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  // @Field(() => [Content])
  @OneToMany(() => Content, content => content.quoteId, {
    cascade: true,
    // eager : true
  })
  contents: Content[];

  @Field()
  @Column({ name: "author" })
  authorId: number;

  @Field(() => Author)
  @ManyToOne(() => Author, (author: Author) => author.id, { eager : true } )
  @JoinColumn({ name: "author", referencedColumnName: "id" })
  author: Author;

  @Field()
  @Column()
  status: string;
}
