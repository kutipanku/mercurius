import {
  Entity,
  OneToMany,
  BaseEntity,
  ManyToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinTable
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Quote } from './Quote';
import { TagContent } from './TagContent';

@ObjectType()
@Entity('tag')
export class Tag extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => [TagContent])
  @OneToMany(() => TagContent, (content) => content.tag, {
    cascade: true,
    eager: true
  })
  contents!: TagContent[];

  @Field(() => [Quote])
  @ManyToMany(() => Quote, (quote: Quote) => quote.tags)
  @JoinTable()
  quotes: Quote[];

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
