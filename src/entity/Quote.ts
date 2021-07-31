import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Author } from './Author';
import { Language } from './Language';

@ObjectType()
@Entity('quote')
export class Quote extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column({ name: "author" })
  authorId: number;

  @Field(() => Author)
  @ManyToOne(() => Author, (author: Author) => author.id, { eager : true} )
  @JoinColumn({ name: "author", referencedColumnName: "id" })
  author: Author;

  @Field()
  @Column({ name: "language" })
  languageId: number;

  @Field(() => Language)
  @ManyToOne(() => Language, (language: Language) => language.id, { eager : true })
  @JoinColumn({ name: "language", referencedColumnName: "id" })
  language: Language;

  @Field()
  @Column()
  status: string;

  @Field()
  @Column()
  isDeleted: boolean;
}
