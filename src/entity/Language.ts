import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Content } from './Content';

@ObjectType()
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

  @OneToMany(() => Content, (content: Content) => content.languageId)
  content!: Content[];

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn({
    default: () => null,
    nullable: true,
  })
  updateDate?: Date;

  @DeleteDateColumn()
  deleteDate?: Date
}
