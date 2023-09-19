import {
  Entity,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Quote } from './Quote';
import { CategoryContent } from './CategoryContent';

@ObjectType()
@Entity('category')
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => [Quote])
  @OneToMany(() => Quote, (quote: Quote) => quote.category)
  quote!: Quote[];

  @Field(() => [CategoryContent])
  @OneToMany(() => CategoryContent, (content) => content.category, {
    cascade: true,
    eager: true
  })
  contents!: CategoryContent[];

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
