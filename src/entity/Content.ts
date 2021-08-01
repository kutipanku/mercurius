import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Language } from './Language';
import { Quote } from './Quote';

@ObjectType()
@Entity('content')
export class Content extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column({ name: 'quote' })
  quoteId: string;

  @Field(() => Quote)
  @ManyToOne(() => Quote, (quote: Quote) => quote.id)
  @JoinColumn({ name: 'quote', referencedColumnName: 'id' })
  quote: Quote;

  @Field()
  @Column({ name: 'language' })
  languageId: number;

  @Field(() => Language)
  @ManyToOne(() => Language, (language: Language) => language.id, {
    eager: true
  })
  @JoinColumn({ name: 'language', referencedColumnName: 'id' })
  language: Language;

  @Field({
    nullable: true,
  })
  @Column()
  createDate: string;

  @Field({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  updateDate: string;
}
