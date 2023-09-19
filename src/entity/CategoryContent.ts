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
import { Category } from './Category';

@ObjectType()
@Entity('category_content')
export class CategoryContent extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column({ name: 'category' })
  categoryId!: string;

  @Field(() => Category)
  @ManyToOne(() => Category, (category: Category) => category.id)
  @JoinColumn({ name: 'category', referencedColumnName: 'id' })
  category!: Category;

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
