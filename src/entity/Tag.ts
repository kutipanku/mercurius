import {
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Quote } from '@/entity';

@ObjectType('TagEntity')
@Entity('tag')
export class Tag extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => [Quote], {
    nullable: true
  })
  @ManyToMany(() => Quote, (quote: Quote) => quote.tags)
  quotes: Quote[];

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
