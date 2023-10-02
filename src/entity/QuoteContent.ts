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
import { Quote } from './Quote';

@ObjectType('QuoteContentEntity')
@Entity('qoute_content')
export class QuoteContent extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column({ name: 'quote' })
  quoteId!: string;

  @Field(() => Quote)
  @ManyToOne(() => Quote, (quote: Quote) => quote.id)
  @JoinColumn({ name: 'quote', referencedColumnName: 'id' })
  quote!: Quote;

  @Field()
  @Column({ name: 'language' })
  languageId!: number;

  @Field(() => Language)
  @ManyToOne(() => Language, (language: Language) => language.id, {
    eager: true
  })
  @JoinColumn({ name: 'language', referencedColumnName: 'id' })
  language!: Language;

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
