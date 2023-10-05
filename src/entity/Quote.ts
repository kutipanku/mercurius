import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Author, Category, Tag } from '@/entity';

@ObjectType('QuoteEntity')
@Entity('quote')
export class Quote extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

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

  @Field(() => [Tag], {
    nullable: true
  })
  @ManyToMany(() => Tag, (tag) => tag.quotes)
  @JoinTable()
  tags: Tag[];

  @Field({
    nullable: true
  })
  @Column({
    nullable: true
  })
  contentID?: string;

  @Field({
    nullable: true
  })
  @Column({
    nullable: true
  })
  contentEN?: string;

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
