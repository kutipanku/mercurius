import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Author } from './Author';
import { Content } from './Content';

@ObjectType()
@Entity('quote')
export class Quote extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => [Content])
  @OneToMany(() => Content, (content) => content.quote, {
    cascade: true,
    eager: true
  })
  contents!: Content[];

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
  @Column()
  status!: string;

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
