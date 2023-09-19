import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Author } from './Author';
import { QuoteContent } from './QuoteContent';
import { Category } from './Category';
import { Tag } from './Tag';

@ObjectType()
@Entity('quote')
export class Quote extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => [QuoteContent])
  @OneToMany(() => QuoteContent, (content) => content.quote, {
    cascade: true,
    eager: true
  })
  contents!: QuoteContent[];

  @Field()
  @Column({ name: 'author' })
  authorId!: number;

  @Field(() => Author)
  @ManyToOne(() => Author, (author: Author) => author.id, {
    eager: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'author', referencedColumnName: 'id' })
  author!: Author;

  @Field()
  @Column({ name: 'category' })
  categoryId!: number;

  @Field(() => Category)
  @ManyToOne(() => Category, (category: Category) => category.id, {
    eager: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'category', referencedColumnName: 'id' })
  category!: Category;

  @Field()
  @Column()
  status!: string;

  @Field(() => [Tag])
  @ManyToMany(() => Tag, tag => tag.quotes, {
    eager: true
  })
  @JoinTable()
  tags: Tag[];

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
