import {
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Quote } from '@/entity';

@ObjectType('CategoryEntity')
@Entity('category')
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => [Quote])
  @OneToMany(() => Quote, (quote: Quote) => quote.category)
  quote!: Quote[];

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
