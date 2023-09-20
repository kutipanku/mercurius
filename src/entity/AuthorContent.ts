import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Language } from './Language';
import { Author } from './Author';

@ObjectType()
@Entity('author_content')
export class AuthorContent extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column({ name: 'author' })
  authorId!: number;

  @Field(() => Author)
  @ManyToOne(() => Author, (author: Author) => author.id)
  @JoinColumn({ name: 'author', referencedColumnName: 'id' })
  author!: Author;

  @Field()
  @Column({ name: 'language' })
  languageId: number;

  @Field(() => Language, { nullable: true })
  @ManyToOne(() => Language, (language: Language) => language.id, {
    eager: true
  })
  @JoinColumn({ name: 'language', referencedColumnName: 'id' })
  language: Language;

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn({
    default: () => null,
    nullable: true
  })
  updateDate?: Date;

  @DeleteDateColumn()
  deleteDate?: Date;
}
