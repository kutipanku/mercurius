import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Content } from './Content';

@ObjectType()
@Entity('language')
export class Language extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  shortName: string;

  @OneToMany(() => Content, (content: Content) => content.languageId)
  content: Content[];

  @Field()
  @Column()
  createDate: string;

  @Field()
  @Column({
    nullable: true,
  })
  updateDate: string;
}
