import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Quote } from '@/entity';

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

  @Field(() => [Quote])
  @OneToMany(() => Quote, (quote: Quote) => quote.author)
  quotes!: Quote[];

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
