import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType('LanguageEntity')
@Entity('language')
export class Language extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  shortName!: string;

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
