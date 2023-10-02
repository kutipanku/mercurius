import {
  Entity,
  Column,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Quote } from '@/entity';
import { AuthorContent } from './AuthorContent';

@ObjectType('AuthorEntity')
@Entity('author')
export class Author extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field({
    nullable: true
  })
  @Column({
    nullable: true
  })
  pictureUrl?: string;

  @Field(() => [AuthorContent])
  @OneToMany(() => AuthorContent, (content) => content.author, {
    cascade: true,
    eager: true
  })
  contents!: AuthorContent[];

  @Field(() => [Quote])
  @OneToMany(() => Quote, (quote: Quote) => quote.author)
  quotes!: Quote[];

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
